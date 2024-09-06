const Trade = require("../models/trade");
const { producer } = require("../config/kafka");

const DEFAULT_EXPIRATION = 3600;
const { createClient } = require('redis');
const client = createClient();

client.on('error', err => {
  console.error('Redis Client Error:', err);
});

client.connect().catch(err => {
  console.error('Failed to connect to Redis:', err);
});

const createTrade = async (req, res) => {
  const { buyer_id, seller_id, cargo_id, status } = req.body;
  try {
    const trade = new Trade({ buyer_id, seller_id, cargo_id, status });
    await trade.save();

    const eventPayload = [
      {
        topic: "trade_events",
        messages: JSON.stringify({ type: "TRADE_CREATED", trade_id: trade._id }),
      },
    ];

    producer.send(eventPayload, (err, data) => {
      if (err) {
        console.error('Error producing Kafka event:', err);
        return res.status(500).send("Error producing Kafka event");
      }
      res.status(201).send(trade);
    });
  } catch (error) {
    console.error('Error creating trade:', error);
    res.status(500).send("Error creating trade");
  }
};

const getTransactionDetails = async (req, res) => {
  const id = req.params.transaction_Id;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    const redisKey = `redisTransactionData_${id}`;   

    // Check Redis cache first
    const cachedTransaction = await client.get(redisKey);
    if (cachedTransaction) {
      console.log(`Cache hit for key: ${redisKey}`);
      return res.status(200).json(JSON.parse(cachedTransaction));
    }
    
    console.log(`Cache miss for key: ${redisKey}`);

    // Fetch from database if not in cache
    const transaction = await Trade.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Store in Redis cache with expiration
    await client.set(redisKey, JSON.stringify(transaction), {
      EX: DEFAULT_EXPIRATION
    });

    console.log(`Stored data in Redis with key: ${redisKey}`);

    res.status(200).json(transaction);

  } catch (error) {
    console.error('Error fetching transaction details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createTrade, getTransactionDetails };

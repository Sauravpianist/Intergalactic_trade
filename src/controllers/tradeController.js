const Trade = require("../models/trade");
const { producer } = require("../config/kafka");

const createTrade = async (req, res) => {
  const { buyer_id, seller_id, cargo_id, status } = req.body;
  const trade = new Trade( { buyer_id, seller_id, cargo_id, status });
  await trade.save();

  const eventPayload = [
    {
      topic: "trade_events",
      messages: JSON.stringify({ type: "TRADE_CREATED", trade_id: trade._id }),
    },
  ];

  producer.send(eventPayload, (err, data) => {
    if (err) return res.status(500).send("Error producing Kafka event");
    res.status(201).send(trade);
  });
};

const getTransactionDetails = async (req, res) => {
  const id = req.params.transaction_Id;

  try {
    // Validate the ID format if necessary (e.g., if using MongoDB ObjectId)
    if (!id) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    // Find the transaction
    const transaction = await Trade.findById(id);

    // If no transaction is found
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);

  } catch (error) {
    console.error('Error fetching transaction details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {createTrade,getTransactionDetails}
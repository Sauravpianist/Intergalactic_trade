const Cargo = require('../models/cargo');
const DEFAULT_EXPIRATION = 3600;
const { createClient } = require('redis');
const client = createClient();
client.on('error', err => {
  console.error('Redis Client Error:', err);
});

client.connect().catch(err => {
  console.error('Failed to connect to Redis:', err);
});


const createCargo = async (req, res) => {
  try {
    const {origin,destination,weight} = req.body;
  const cargo = new Cargo({origin,destination,weight});
  await cargo.save();
  res.status(201).send(cargo);
  } catch (error) {
    console.error('Error Creating Cargo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
};


const getCargoDetails = async (req, res) => {
  const id = req.params.shipmentId;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Cargo ID is required' });
    }
    const redisKey = `redisCargoData_${id}`; 
    const cachedTransaction = await client.get(redisKey);
    if (cachedTransaction) {
      console.log(`Cache hit for key: ${redisKey}`);
      return res.status(200).json(JSON.parse(cachedTransaction));
    } 
    console.log(`Cache miss for key: ${redisKey}`);

    const cargoDetails = await Cargo.findById(id)
    if (!cargoDetails) {
      return res.status(404).json({ message: 'Cargo not found' });
    }
    await client.set(redisKey, JSON.stringify(cargoDetails), {
      EX: DEFAULT_EXPIRATION
    });

    console.log(`Stored data in Redis with key: ${redisKey}`);
    res.status(200).json(cargoDetails);

  } catch (error) {
    console.error('Error fetching Cargo details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports={createCargo,getCargoDetails}
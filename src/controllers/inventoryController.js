const Inventory = require("../models/inventory");
const DEFAULT_EXPIRATION = 3600;
const { createClient } = require("redis");
const client = createClient();
client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

client.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

const getInventory = async (req, res) => {
  try {
    const stationId = req.params.stationId;

    // Validate the ID
    if (!stationId) {
      return res.status(400).json({ message: 'Station ID is required' });
    }

    const redisKey = `redisInventoryData_${stationId}`;
    const cachedInventory = await client.get(redisKey);

    if (cachedInventory) {
      console.log(`Cache hit for key: ${redisKey}`);
      return res.status(200).json(JSON.parse(cachedInventory));
    }

    console.log(`Cache miss for key: ${redisKey}`);

    const inventory = await Inventory.findOne({ station_id: stationId });

    // Handle case where inventory is not found
    if (!inventory) {
      console.log(`Inventory not found for stationId: ${stationId}`);
      return res.status(404).json({ message: 'Inventory not found' });
    }

    // Cache the fetched inventory
    await client.set(redisKey, JSON.stringify(inventory), {
      EX: DEFAULT_EXPIRATION,
    });

    console.log(`Stored data in Redis with key: ${redisKey}`);
    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createInventory = async (req, res) => {
  try {
    const { station_id, items } = req.body;
    const inventory = new Inventory({ station_id, items });
    await inventory.save();
    res.status(201).send(inventory);
  } catch (error) {
    console.error("Error saving inventory:", err);
  }
};

module.exports = { getInventory, createInventory };

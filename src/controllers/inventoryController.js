const Inventory = require("../models/inventory");

const getInventory = async (req, res) => {
  const inventory = await Inventory.findOne({
    station_id: req.params.stationId,
  });
  res.status(200).send(inventory);
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

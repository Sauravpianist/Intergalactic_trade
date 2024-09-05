const { consumer } = require('../config/kafka');
const Cargo = require('../models/cargo');
const Trade = require('../models/trade');
const Inventory = require('../models/inventory');

consumer.on('message', async (message) => {
  const event = JSON.parse(message.value);

  switch (event.type) {
    case 'TRADE_COMPLETED':
      await Trade.updateOne({ _id: event.trade_id }, { status: 'completed' });
      console.log(`Trade ${event.trade_id} completed.`);
      break;
    case 'CARGO_DELIVERED':
      await Cargo.updateOne({ _id: event.cargo_id }, { status: 'delivered' });
      console.log(`Cargo ${event.cargo_id} delivered.`);
      break;
    case 'INVENTORY_UPDATED':
      await Inventory.updateOne(
        { station_id: event.station_id },
        { $set: { items: event.items } },
        { upsert: true }
      );
      console.log(`Inventory updated for station ${event.station_id}.`);
      break;
    default:
      console.log('Unknown event type:', event.type);
  }
});

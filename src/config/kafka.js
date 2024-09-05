const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const admin = new kafka.Admin(client);

const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'trade_events', partition: 0 }],
  { autoCommit: true }
);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
  console.error('Kafka Producer error: ', err);
});

consumer.on('message', (message) => {
  console.log('Received message:', message);
});

consumer.on('error', (err) => {
  console.error('Kafka Consumer error: ', err);
});

module.exports = { producer, consumer };

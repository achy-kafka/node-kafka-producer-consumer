const avro = require ('avsc');
const { Kafka } = require ('kafkajs'); // NPM Package: Javascript compatible Kafka
const fs = require ('fs');
const path = require ('path');

const eventType = require ('../eventType.js'); // Message AVRO Schema
const config = require ('../kconfig.js'); // Information about Kafka Cluster and Topics

// Reset table every time script runs
fs.writeFileSync(path.resolve(__dirname, './ktable.json'), JSON.stringify({}), 'UTF-8');

// Initiates a new consumer for every topic in config file
const kafka = new Kafka(config);
for (let i = 0; i < config.topics.length; i++) {
  try {
    const topicName = config.topics[i];
    const consumer = kafka.consumer({ groupId: `${topicName}-table-group` });
    consumer.connect();
    consumer.subscribe({ topic: `${topicName}`, fromBeginning: true });
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const table = JSON.parse(fs.readFileSync(path.resolve(__dirname, './ktable.json'), 'UTF-8'));
        const key = message.key.toString();
        table[key] = eventType.fromBuffer(message.value);
        fs.writeFileSync(path.resolve(__dirname, './ktable.json'), JSON.stringify(table), 'UTF-8');
        console.log(`KTable: Table Updated - ${topicName}`);
      },
    });
} catch (err) {console.log(err)}
}

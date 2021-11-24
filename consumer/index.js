import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';
import { io } from 'socket.io-client';

var consumer = new Kafka.KafkaConsumer(
  {
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
  },
  {}
);

consumer.connect();

const socket = io("http://localhost:5000");


consumer
  .on('ready', () => {
    console.log('consumer ready..');
    consumer.subscribe(['test']);
    consumer.consume();
  })
  .on('data', async function (data) {
    console.log(`received message: ${eventType.fromBuffer(data.value)}`);
    const emitted = await socket.emit("consumerMessage", data);
    console.log('emitted', typeof emitted)
  });

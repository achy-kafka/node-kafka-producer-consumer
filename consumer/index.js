import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

var consumer = new Kafka.KafkaConsumer(
  {
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
  },
  {}
);

consumer.connect();

// const printStream =(req, res, next) => {
//   consumer
//   .on('ready', () => {
//     console.log('consumer ready..');
//     consumer.subscribe(['test']);
//     consumer.consume();
//   })
//   .on('data', function (data) {
//     res.locals.msgs = eventType.fromBuffer(data.value)
//     return next();
//   });
// }

// export default printStream;

consumer
  .on('ready', () => {
    console.log('consumer ready..');
    consumer.subscribe(['test']);
    consumer.consume();
  })
  .on('data', function (data) {
    console.log(`received message: ${eventType.fromBuffer(data.value)} \n`);
  });

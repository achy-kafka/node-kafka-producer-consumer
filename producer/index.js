//import Kafka from 'node-rdkafka';
import { Kafka } from 'kafkajs';
import eventType from '../eventType.js';
//import config from '../kafkaConfig.js';


const username = 'JUJA6GJGJCDSUYOP'
const password = '1XIN/fry4johm7kHhZ+n88jeKc11xJR3G07QXzfRmtnKA/f+s7mcbdkdvRIi/ixc'

const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

const config = {
  clientId: 'kafQL',
  brokers: ['pkc-lzvrd.us-west4.gcp.confluent.cloud:9092'],
  // kafka_topic: 'test',
  ssl,
  sasl,
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};

const kafka = new Kafka(config);
// const admin = kafka.admin();

// const createTopic = async () => {
//   await admin.connect()
//   await admin.createTopics({
//     topics: [ "test" ],
//     waitForLeaders: true,
//   })
// }

// createTopic().catch(error => {
//   console.error(error)
//   process.exit(1)
// })


const producer = kafka.producer();
const runProducer = async () => {

  //const message = { hot : "dog"};
  // 3.Connecting producer to kafka broker.
  console.log("Connecting...")
  try {
    await producer.connect()
    console.log("Connected!")
    const message = eventType.toBuffer({"category" : "CAT" , "noise" : "meow"})
    await producer.send({
      topic: 'test',
      messages:
      [{ key: "1", value: message }],
      })
  } catch (err) {console.log("Failed to write")}
}

setInterval(() => {
  runProducer();
}, 3000);


//CONFLUENT ATTEMPT
// const configSettings = {
//   'bootstrap.servers': config['bootstrap.servers'],
//   'sasl.username': config['sasl.username'],
//   'sasl.password': config['sasl.password'],
//   'security.protocol': config['security.protocol'],
//   'sasl.mechanisms': config['sasl.mechanisms']
// }
// const adminClient = Kafka.AdminClient.create(configSettings);

// function createProducer(configSettings) {
//   const producer = new Kafka.Producer(configSettings);
//   return new Promise((resolve, reject) => {
//     producer
//       .on('ready', () => resolve(producer))
//       .on('delivery-report', onDeliveryReport)
//       .on('event.error', (err) => {
//         console.warn('event.error', err);
//         reject(err);
//       });
//     producer.connect();
//   });
// }


// async function sendMessage() {
//   const producer = await createProducer(configSettings);


//   const key = 'alice';
//   const value = Buffer.from(JSON.stringify({ something: "something" }));

//   console.log(`Producing record ${key}\t${value}`);

//   producer.produce('test', -1, value, key);
  

//   producer.flush(10000, () => {
//     producer.disconnect();
//   });
// }

// setInterval(() => {
//   produceExample()
//   .catch((err) => {
//     console.error(`Something went wrong:\n${err}`);
//     process.exit(1);
//   });
// }, 3000);




// EXAMPLE WITH DOCKER INSTANCE
// const stream = Kafka.Producer.createWriteStream(
//   {
//     'metadata.broker.list': 'localhost:9092',
//   },
//   {},
//   {
//     topic: 'test',
//   }
// );

// stream.on('error', (err) => {
//   console.error('Error in our kafka stream');
//   console.error(err);
// });

// function queueRandomMessage() {
//   const category = getRandomAnimal();
//   const noise = getRandomNoise(category);
//   const event = { category, noise };
//   const success = stream.write(eventType.toBuffer(event));
//   if (success) {
//     console.log(`message queued (${JSON.stringify(event)})`);
//   } else {
//     console.log('Too many messages in the queue already..');
//   }
// }

// function getRandomAnimal() {
//   const categories = ['CAT', 'DOG'];
//   return categories[Math.floor(Math.random() * categories.length)];
// }

// function getRandomNoise(animal) {
//   if (animal === 'CAT') {
//     const noises = ['meow', 'purr'];
//     return noises[Math.floor(Math.random() * noises.length)];
//   } else if (animal === 'DOG') {
//     const noises = ['bark', 'woof'];
//     return noises[Math.floor(Math.random() * noises.length)];
//   } else {
//     return 'silence..';
//   }
// }

// setInterval(() => {
//   queueRandomMessage();
// }, 3000);

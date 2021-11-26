import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = Kafka.Producer.createWriteStream(
  {
    'metadata.broker.list': 'localhost:9092',
  },
  {},
  {
    topic: 'test',
  }
);

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});
const distanceFunc = getDistance();

function queueTripInfo() {
  const tripId = getRandomTripId();
  const distance = distanceFunc(tripId);
  console.log('distance--->', distance);
  const event = { tripId, distance };
  const success = stream.write(eventType.toBuffer(event));
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}
function getRandomTripId() {
  const trips = ['trip1', 'trip2'];
  return trips[Math.floor(Math.random() * trips.length)];
}

function getDistance() {
  const cache = {};
  return function innerFunc(tripId) {
    if (cache[tripId]) {
      cache[tripId] = cache[tripId] + Math.floor(Math.random() * 10);
      return cache[tripId];
    } else {
      cache[tripId] = Math.floor(Math.random() * 10);
      return cache[tripId];
    }
  };
}

// const getStatus = () => {
//   return {
//     statusId: 'aecb3757-acda-49f2-a4d1-a2d8b976a9ed',
//     tripId: '5d029319-d9e1-40a9-b67f-f9a2b4556e45',
//     vehicleId: '567fc4c9-0c13-4615-883b-74286cdfaf21',
//     position: { lat: 0.9972131258906656, lon: 0.9293360794736407 },
//     batteryLevel: 1459640764,
//     distance: 1367064801,
//     timestamp: 1793549785,
//   };
// };

setInterval(() => {
  queueTripInfo();
}, 3000);

// cat/dog example

// function queueRandomMessage() {
//   const category = getRandomAnimal();
//   const noise = getRandomNoise(category);
//   const event = { category, noise };
//   // statusUpdate = {category, values}
//   const success = stream.write(eventType.toBuffer(event));
//   if (success) {
//     console.log(`message queued (${JSON.stringify(event)})`);
//   } else {
//     console.log('Too many messages in the queue already..');
//   }
// }

// function getRandomAnimal() {
//   const categories = ['CAT', 'DOG'];
//   // categories = [statusId, tripId, carId, poistion, timestamp]
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

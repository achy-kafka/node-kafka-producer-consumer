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
const batteryFunc = getBattery();

function queueTripInfo() {
  const tripId = getRandomTripId();
  const statusId = getStatusId(tripId);
  const vehicleId = getVehicleId(tripId);
  const distance = distanceFunc(tripId);
  const batteryLevel = batteryFunc(tripId);
  const position = getPosition();
  const now = new Date();
  const timestamp = now.toString();
  // console.log('distance--->', distance);
  // console.log('batteryLevel--->', batteryLevel);
  // console.log('positon--->', position);
  // console.log('timestamp--->', timestamp);
  const event = {
    statusId,
    tripId,
    vehicleId,
    position,
    batteryLevel,
    distance,
    timestamp,
  };

  const success = stream.write(eventType.toBuffer(event));
  if (success) {
    console.log(`message queued (${JSON.stringify(event)}) \n`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}

function getStatusId(tripId) {
  if (tripId === 'trip1') return 'status1';
  if (tripId === 'trip2') return 'status2';
}

function getPosition() {
  const lat = 40 + Math.random();
  const lon = -(70 + Math.random());
  return {
    lat: lat,
    lon: lon,
  };
}

function getRandomTripId() {
  const trips = ['trip1', 'trip2'];
  return trips[Math.floor(Math.random() * trips.length)];
}

function getVehicleId(tripId) {
  if (tripId === 'trip1') return 'car1';
  if (tripId === 'trip2') return 'car2';
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

function getBattery() {
  const cache = {};
  return function innerFunc(tripId) {
    if (cache[tripId]) {
      cache[tripId] = cache[tripId] - 1;
      return cache[tripId];
    } else {
      cache[tripId] = Math.floor(Math.random() * 10) + 85;
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

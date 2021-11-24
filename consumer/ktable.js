'use strict';
import { KafkaStreams } from 'kafka-streams';
import eventType from '../eventType.js';
import config from '../tsconfig.json';

const kafkaStreams = new KafkaStreams(config);

kafkaStreams.on('error', (error) => {
  console.log('Error occured:', error.message);
});

//creating a ktable requires a function that can be
//used to turn the kafka messages into key-value objects
//as tables can only be built on key-value pairs
const table = kafkaStreams.getKTable('test', keyValueMapperEtl);

// DELETE: Tried to see if could use AVROs inferred schema to decode.
// NOT POSSIBLE
// const type = avro.Type.forValue({category:"CAT",noise: "woof"});

function keyValueMapperEtl(kafkaMessage) {
  const topic = kafkaMessage.topic;
  const value = eventType.fromBuffer(kafkaMessage.value) // { category: 'CAT', noise: 'meow' }
  return {
    key: value.category,
    value: value.noise,
  };
}


//consume the first 10 messages on the topic to build the table
table
  .consumeUntilCount(500, () => {
    //fires when 10 messages are consumed

    //the table has been built, there are two ways
    //to access the content now

    //1. as map object
    table.getTable().then((map) => {
      console.log(map); //will log "strawberry"
    });

    //2. as replayed stream
    // table.forEach(row => {
    //     console.log(row);
    // });

    //you can replay as often as you like
    //replay will simply place every key-value member
    //of the internal map onto the stream once again
    // table.replay();

    //kafka consumer will be closed automatically
  })
  //be aware that any operator you append during this runtime
  //will apply for any message that is on the stream (in change-log behaviour)
  //you have to consume the topic first, for it to be present as table
  .atThroughput(10, () => {
    //fires once when 10 messages are consumed
    console.log('consumed 10 messages.');
  });

//start the stream/table
//will emit messages as soon as
//kafka consumer is ready
table.start();


const printTable = (req, res, next) => {
  table.getTable()
  .then((map) => {
    res.locals.table = map;
    next();
  })
}

export default printTable;
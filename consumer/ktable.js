'use strict';

/*
 in contrast to a KStream (change-log topic representation)
 a KTable is a table like representation of a topic,
 meaning only the last value of a key will be present in the table.
 the input topic could look like this:
 "fruit banana"
 "fruit cherry"
 "vegetable broccoli"
 "fruit strawberry"
 "vegetable lettuce"
 the output topic would then look like this:
 "fruit strawberry",
 "vegetable lettuce"
*/

import { KafkaStreams } from 'kafka-streams';
import config from '../tsconfig.json';

const kafkaStreams = new KafkaStreams(config);

kafkaStreams.on('error', (error) => {
  console.log('Error occured:', error.message);
});

//creating a ktable requires a function that can be
//used to turn the kafka messages into key-value objects
//as tables can only be built on key-value pairs
const table = kafkaStreams.getKTable('test', keyValueMapperEtl);

function keyValueMapperEtl(kafkaMessage) {
  const value = kafkaMessage.value.toString('utf8');
  const elements = value.toLowerCase().split(' ');
  return {
    key: elements[0],
    value: elements[1],
  };
}

//consume the first 10 messages on the topic to build the table
table
  .consumeUntilCount(10, () => {
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
    //fires once when 50 messages are consumed
    console.log('consumed 10 messages.');
  });

//start the stream/table
//will emit messages as soon as
//kafka consumer is ready
table.start();

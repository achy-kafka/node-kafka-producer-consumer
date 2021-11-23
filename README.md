# node-kafka-producer-consumer

Created for [this YouTube tutorial](https://www.youtube.com/watch?v=EiDLKECLcZw).

A kafka producer/consumer proof of concept using node.

![Screen Shot 2021-04-20 at 09 56 47](https://user-images.githubusercontent.com/17026751/115368228-cbcd0000-a1be-11eb-9d17-6ada1ad5ff98.png)

## Prerequisites

- `node`
- `docker`

<!-- ## Running locally

- `npm install` - installs npm dependencies.
- `./scripts/start-kafka.sh` - starts kafka inside docker container.
- `./scripts/create-topic.sh` - creates kafka topic.
- `npm run start:producer` - starts producer.
- `npm run start:consumer` - starts consumer. -->

## Instructions for local Kafka Cluster

0. `npm install` - installs npm dependencies.
1. Spin up Kafka instance by entering this command in terminal: docker-compose up
   After typing this in terminal, open Docker Desktop app. Find the Kafka container, and type following two commands in its CLI:
   Navigate into current broker:
   ` cd opt/ka`fka
   Create new topic:
   ` ./bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic t`est
   Terminal should print "Created topic test."

2. Spin up producer by typing this in separate terminal: np`m run start:producer `3. Spin up consumer by typing this in separate terminal: np`m run start:consumer `

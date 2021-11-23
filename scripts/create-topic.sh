docker-compose exec kafka \ /opt/bitnami/kafka/bin/kafka-topics.sh  
--create 
--topic test 
--partitions 1 
--replication-factor 1 
--if-not-exists --zookeeper localhost:9092


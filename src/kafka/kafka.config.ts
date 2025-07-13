// src/kafka/kafka.config.ts
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
    brokers: ['127.0.0.1:9092'],
        //   brokers: ['localhost:9092'], // adjust as needed
    },
    consumer: {
      groupId: 'nestjs-kafka-group',
    },
  },
};

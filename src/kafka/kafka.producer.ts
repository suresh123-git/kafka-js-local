// src/kafka/kafka.producer.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'batch-producer', // for batch processing
    brokers: ['127.0.0.1:9092'],
    // brokers: ['localhost:9092'],
  });

  private producer = this.kafka.producer({
    allowAutoTopicCreation: true,
    idempotent: false,
    maxInFlightRequests: 5,
    retry: {
      retries: 5,
    },
  }); // producer for batch processing
  // private producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  //for batch processing
  async produceBatch(topic: string, messages: string[]) {
    await this.producer.send({
      topic,
      messages: messages.map((msg) => ({ value: msg })),
    });
  }

  // async sendMessagesLoop(topic: string, count: number) {
  //   for (let i = 0; i < count; i++) {
  //     await this.producer.send({
  //       topic,
  //       messages: [{ value: `message ${i + 1}` }],
  //     });
  //   }
  // }

  // key based partitiong
  async sendMessagesLoop() {
    for (let i = 1; i <= 5; i++) {
      const res = await this.producer.send({
        topic: 'user-events',
        messages: [
          { key: 'user-1', value: `user-1 message ${i}` },
          { key: 'user-2', value: `user-2 message ${i}` },
        ],
      });
      console.log(res, 'result');
    }
  }
}

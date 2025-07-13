// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from './kafka/kafka.producer';

@Injectable()
export class AppService {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  async sendUserCreatedEvent() {
    await this.kafkaProducer.produce('user.created', { id: 1, name: 'Suresh' });
    return 'Kafka message sent';
  }
}

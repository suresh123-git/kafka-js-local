import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaAdminService implements OnModuleInit {
  private kafka = new Kafka({ brokers: ['localhost:9092'] });

  async onModuleInit() {
    const admin = this.kafka.admin();
    await admin.connect();

    await admin.createTopics({
      topics: [
        {
          topic: 'user-events',
          numPartitions: 2,
          replicationFactor: 1,
        },
      ],
    });

    console.log('✅ Kafka topic ensured: user-events');
    await admin.disconnect();
  }
}

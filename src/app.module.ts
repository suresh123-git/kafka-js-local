// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaProducerService } from './kafka/kafka.producer';
import { KafkaAdminService } from './kafka/kafka.admin';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KafkaProducerService, KafkaAdminService],
})
export class AppModule {}

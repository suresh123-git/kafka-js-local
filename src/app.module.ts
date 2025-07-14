// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaProducerService } from './kafka/kafka.producer';
import { KafkaAdminService } from './kafka/kafka.admin';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [AppController],
  providers: [AppService, KafkaProducerService, KafkaAdminService, makeCounterProvider({ name: 'http_requests_total', help: 'Total HTTP requests' })],
})
export class AppModule {}

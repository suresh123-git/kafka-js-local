// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { KafkaProducerService } from './kafka/kafka.producer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kafkaProducer: KafkaProducerService,
  ) {
    console.log('application kafka');
  }
  @EventPattern('user.created')
  handleUserCreated(@Payload() message: any) {
    console.log('💡 Kafka Event Received:', message);
  }
  @Get('send-event')
  async sendEvent() {
    return this.appService.sendUserCreatedEvent();
  }

  // batch processing
  @Get('/send-batch')
  async sendBatch() {
    const sampleMessages = ['message 1', 'message 2', 'message 3'];
    await this.kafkaProducer.produceBatch('batch.topic', sampleMessages);
    return { status: 'batch sent' };
  }
  @MessagePattern('batch.topic')
  handleBatchMessages(data: any) {
    console.log('Batch message received:', data.toString());
  }
  @Get('/send-auto-batch')
  sendAutoBatch() {
    // return this.kafkaProducer.sendMessagesLoop('auto.batch.topic', 10);
    return this.kafkaProducer.sendMessagesLoop(); // key based partitioning
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { EmailDto } from './dtos/email.dto';
import { PhoneDto } from './dtos/phone.dto';

@Controller('notifications')
export class NotificationController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
        allowAutoTopicCreation: true
      }
    }
  })

  private client: ClientKafka;

  @Post('email')
  sendEmail(@Body() data: EmailDto) {
    return this.client.emit('notification-email', data);
  }

  @Post('sms')
  sendPhone(@Body() data: PhoneDto) {
    return this.client.emit('notification-sms', data);
  }
}

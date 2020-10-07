import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notification-email')
  async sendEmail(@Payload() data: any): Promise<void> {
    await this.appService.sendEmail(data.value.email, data.value.name);
  }

  @MessagePattern('notification-sms')
  async sendSMS(@Payload() data: any): Promise<void> {
    await this.appService.sendSMS(data.value.phone, data.value.name);
  }
}

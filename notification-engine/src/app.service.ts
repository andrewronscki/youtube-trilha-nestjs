import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, TextContent, IMessage } from '@zenvia/sdk';
import { Model } from 'mongoose';
import { NotificationDto } from './dtos/notification.dto';
import { Notification } from './interfaces/notification.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly sendGrid: SendGridService,
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
  ) {}

  private client = new Client(process.env.ZENVIA_TOKEN);

  async sendEmail(userId: number, email: string, name: string): Promise<void> {
    await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "User Created",
      text: `Hello ${name}, your user created with success!`,
      html: `<strong>Hello ${name}, your user created with success!</strong>`,
    }).then(async response => {
      await this.createMongoNotification(userId, 'email', response, 'SUCCESS');
    }).catch(async error => {
      await this.createMongoNotification(userId, 'email', error, 'ERROR');
    });
  }

  async sendSMS(userId: number, phone: string, name: string): Promise<void> {
    const sms = this.client.getChannel('sms');
    const content = new TextContent(`Hello ${name}, your user created with success!`);
    
    await sms.sendMessage(process.env.KEYWORD, phone, content)
      .then(async ({channel, contents, from, to, direction, id: messageId}: IMessage) => {
        const response: any = {
          channel,
          contents,
          from,
          to,
          direction,
          messageId,
        };

        await this.createMongoNotification(userId, 'sms', response, 'SUCCESS');
      }).catch(async error => {
        await this.createMongoNotification(userId, 'sms', error, 'ERROR');
      });
  }

  private async createMongoNotification(userId: number, type: 'sms' | 'email', response: any, status: 'SUCCESS' | 'ERROR'): Promise<void> {
    const notification: NotificationDto ={
      userId,
      type,
      response,
      status,
    };

    const createNotification = new this.notificationModel(notification);
    await createNotification.save();
  }
}

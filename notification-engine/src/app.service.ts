import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { Client, TextContent } from '@zenvia/sdk';

@Injectable()
export class AppService {
  constructor(private readonly sendGrid: SendGridService) {}

  private client = new Client(process.env.ZENVIA_TOKEN);

  async sendEmail(email: string, name: string): Promise<void> {
    await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "User Created",
      text: `Hello ${name}, your user created with success!`,
      html: `<strong>Hello ${name}, your user created with success!</strong>`,
    });
  }

  async sendSMS(phone: string, name: string): Promise<void> {
    const sms = this.client.getChannel('sms');
    const content = new TextContent(`Hello ${name}, your user created with success!`);
    
    await sms.sendMessage(process.env.KEYWORD, phone, content);
  }
}

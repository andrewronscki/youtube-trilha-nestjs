import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationSchema } from './interfaces/notification.schema';

@Module({
  imports: [
    ConfigModule.forRoot(), SendGridModule.forRoot({
      apikey: process.env.SEND_GRID_ACCESS_KEY,
    }),
    MongooseModule.forRoot('mongodb://localhost/notification'),
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

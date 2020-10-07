import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), SendGridModule.forRoot({
    apikey: process.env.SEND_GRID_ACCESS_KEY,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserEntity } from './interfaces/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../interfaces/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'user',
    entities: [UserEntity],
    synchronize: true,
  }),]
})
export class DatabaseModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import UserSeederService from './users.seed';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from 'src/operations/entities/operation.entity';
import OperationSeederService from './operations.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  providers: [OperationSeederService],
  exports: [OperationSeederService],
})
export class OperationSeederModule {}

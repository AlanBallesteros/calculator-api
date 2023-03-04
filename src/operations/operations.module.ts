import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';
import { RecordsModule } from 'src/records/records.module';
import CalculationFactory from './calculations/CalculationFactory';
import { HttpClientModule } from 'src/httpClient/http.client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    RecordsModule,
    HttpClientModule,
  ],
  controllers: [OperationsController],
  providers: [OperationsService, CalculationFactory],
})
export class OperationsModule {}

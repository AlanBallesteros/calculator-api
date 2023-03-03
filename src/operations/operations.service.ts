import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiltersArgsDto } from 'src/dto/filters-args.dto';
import { RecordsService } from 'src/records/records.service';
import { Repository } from 'typeorm';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity';
import { Record } from 'src/records/entities/record.entity';
import {
  CalculationFactory,
  CalculationTypes,
} from './calculations/calculationFactory';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationsRepository: Repository<Operation>,
    private recordsService: RecordsService,
    private calculationFactory: CalculationFactory,
  ) {}

  async findAll(filtersArgs: FiltersArgsDto): Promise<Operation[]> {
    const query = this.operationsRepository.createQueryBuilder('operation');
    const operations = await query.getMany();
    return this.formatOperations(operations);
  }

  async findOne(id: number): Promise<Operation> {
    console.log('number', id);
    const found = await this.operationsRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async update(
    id: number,
    updateOperationDto: UpdateOperationDto,
  ): Promise<Operation> {
    const { cost } = updateOperationDto;
    const operation = await this.findOne(id);
    operation.cost = cost;
    await this.operationsRepository.save(operation);
    return operation;
  }

  async remove(id: number) {
    const result = await this.operationsRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  async calculate(
    operationId: number,
    userId: number,
    data: Array<number>,
  ): Promise<Record> {
    const { cost, type } = await this.findOne(operationId);
    let userBalance;
    try {
      const record = await this.recordsService.findOneByUserId(userId);
      userBalance = record.userBalance;
    } catch (error) {
      userBalance = 0;
    }
    if (userBalance < cost) {
      throw new NotFoundException('Insuficient Credit for operation');
    }

    const calculationOperation =
      this.calculationFactory.createCalculation(type);
    const calculationResult = await calculationOperation.calculate(data);
    const newUserBalance =
      type === CalculationTypes.ADD_CREDITS
        ? parseFloat(userBalance) + parseFloat(calculationResult)
        : parseFloat(userBalance) - cost;

    const record = await this.recordsService.create({
      operationId,
      userId,
      amount: cost,
      userBalance: newUserBalance,
      operationResponse: calculationResult || '',
    });

    return record;
  }

  private formatOperations(operations: Operation[]): Operation[] {
    if (!operations.length) return null;

    const MIN_VAL_OPERATION = {
      addition: { min_num: 2, symbol: '+' },
      subtraction: { min_num: 2, symbol: '-' },
      multiplication: { min_num: 2, symbol: 'x' },
      division: { min_num: 2, symbol: '/' },
      square_root: { min_num: 1, symbol: 'sqr2' },
      random_image: { min_num: 1, symbol: '' },
    };

    return operations.map((operation) => ({
      ...MIN_VAL_OPERATION[operation.type],
      ...operation,
    }));
  }
}

import { DeepPartial, Repository } from 'typeorm';
import { Operation } from '../../../operations/entities/operation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class OperationSeederService {
  /**
   *
   * @param {Repository<Operation>} operationRepository
   */
  constructor(
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
  ) {}

  create(): Promise<Operation[]> {
    const operationsCreated = [
      { type: 'addition', cost: 0.25 },
      { type: 'subtraction', cost: 0.25 },
      { type: 'multiplication', cost: 0.25 },
      { type: 'division', cost: 0.25 },
      { type: 'square_root', cost: 0.25 },
      { type: 'random_image', cost: 0.25 },
      { type: 'add_credits', cost: 0.0 },
    ].map((operation: DeepPartial<Operation>) => {
      return this.operationRepository.create(operation);
    });
    return this.operationRepository.save(operationsCreated);
  }
}

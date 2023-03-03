import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiltersArgsDto } from 'src/dto/filters-args.dto';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';
import type { ResponseRecords } from './types/response-records';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    const record = this.recordsRepository.create({
      ...createRecordDto,
    });

    await this.recordsRepository.save(record);
    return record;
  }

  async findAll(filtersDto: FiltersArgsDto): Promise<ResponseRecords> {
    const { limit, offset, sort, search, orderby } = filtersDto;
    const query = this.recordsRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.user', 'user')
      .leftJoinAndSelect('record.operation', 'operation')
      .take(limit)
      .skip(offset);
    if (search) {
      query.where('operation.type like :type', { type: `%${search}%` });
    }
    if (orderby) {
      console.log(orderby);
      query.orderBy(orderby, sort);
    }
    const [records, count] = await query.getManyAndCount();
    return {
      records,
      pagination: {
        sortBy: orderby,
        descending: sort === 'DESC',
        page: offset / limit + 1,
        rowsPerPage: limit,
        rowsNumber: count,
      },
    };
  }

  async findOneByUserId(userId: number): Promise<Record> {
    const record = await this.recordsRepository.findOneOrFail({
      where: { user: { id: userId } },
      order: {
        date: 'DESC',
      },
    });

    return record;
  }
}

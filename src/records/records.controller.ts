import { Controller, Get, Query } from '@nestjs/common';
import { RecordsService } from './records.service';
import { FiltersArgsDto } from 'src/dto/filters-args.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  findAll(@Query() filtersDto: FiltersArgsDto) {
    return this.recordsService.findAll(filtersDto);
  }
}

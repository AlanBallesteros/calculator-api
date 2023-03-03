import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { FiltersArgsDto } from 'src/dto/filters-args.dto';
import { Operation } from './entities/operation.entity';
import { RecordOperationDto } from './dto/record-operation.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get()
  findAll(@Query() filtersArgs: FiltersArgsDto): Promise<Operation[]> {
    return this.operationsService.findAll(filtersArgs);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Operation> {
    return this.operationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ): Promise<Operation> {
    return this.operationsService.update(+id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.operationsService.remove(+id);
  }

  @Get('calculate/:operationId')
  calculate(
    @Param('operationId') operationId: string,
    @Query() calculationParams: RecordOperationDto,
    @Request() req,
  ) {
    const {
      user: { userId },
    } = req;
    const values = calculationParams.values
      .split(',')
      .map((val) => parseFloat(val));
    return this.operationsService.calculate(+operationId, +userId, values);
  }
}

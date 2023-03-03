import { IsNumber, Min, IsOptional, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { type } from 'os';

export class FiltersArgsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  orderby?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

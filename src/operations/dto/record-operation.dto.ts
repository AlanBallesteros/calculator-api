import { IsNotEmpty } from 'class-validator';

export class RecordOperationDto {
  @IsNotEmpty()
  values: string;
}

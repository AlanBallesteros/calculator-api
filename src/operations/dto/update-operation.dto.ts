import { IsDefined } from 'class-validator';

export class UpdateOperationDto {
  @IsDefined()
  cost: number;
}

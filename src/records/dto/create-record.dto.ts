import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  operationId: number;

  @IsNotEmpty()
  userId: number;

  @IsDefined()
  amount: number;

  @IsDefined()
  userBalance: number;

  @IsDefined()
  operationResponse: string;
}

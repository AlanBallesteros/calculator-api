import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDefined } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsDefined()
  status: boolean;
}

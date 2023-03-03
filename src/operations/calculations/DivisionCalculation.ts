import { BadRequestException } from '@nestjs/common';
import { CalculationInterface } from './calculationFactory';

export class DivisionCalculation implements CalculationInterface {
  calculate(data: Array<number>): number {
    const [val1, val2] = data;
    if (val2 === 0) {
      throw new BadRequestException('Not divisible by zero');
    }
    return val1 / val2;
  }
}

import { CalculationInterface } from './CalculationFactory';

export class SubstractionCalculation implements CalculationInterface {
  calculate(data: Array<number>): number {
    const [val1, val2] = data;
    return val1 - val2;
  }
}

import { CalculationInterface } from './CalculationFactory';

export class AdditionCalculation implements CalculationInterface {
  calculate(data: Array<number>): number {
    return data.reduce((total, number) => (total += number), 0);
  }
}

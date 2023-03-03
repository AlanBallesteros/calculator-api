import { CalculationInterface } from './calculationFactory';

export class MultiplicationCalculation implements CalculationInterface {
  calculate(data: Array<number>): number {
    return data.reduce((total, number) => {
      if (total === 0) {
        return number;
      }
      return (total *= number);
    }, 0);
  }
}

import { CalculationInterface } from './calculationFactory';

export class SquareRootCalculation implements CalculationInterface {
  calculate(data: Array<number>): number {
    return Math.sqrt(data[0]);
  }
}

import { CalculationInterface } from './CalculationFactory';

export class SquareRootCalculation implements CalculationInterface {
  calculate(data: Array<number>): number {
    return Math.sqrt(data[0]);
  }
}

import { CalculationInterface } from './calculationFactory';

export class AddCreditsCalculation implements CalculationInterface {
  calculate(data: Array<number>): number {
    return data[0];
  }
}

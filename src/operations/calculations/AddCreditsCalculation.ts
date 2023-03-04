import { CalculationInterface } from './CalculationFactory';

export class AddCreditsCalculation implements CalculationInterface {
  calculate(data: Array<number>): number {
    return data[0];
  }
}

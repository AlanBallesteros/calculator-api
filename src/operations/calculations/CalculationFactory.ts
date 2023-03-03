import { Injectable, NotFoundException } from '@nestjs/common';
import { AdditionCalculation } from './AdditionCalculation';
import { SubstractionCalculation } from './SubstractionCalculation';
import { DivisionCalculation } from './DivisionCalculation';
import { MultiplicationCalculation } from './MultiplicationCalculation';
import { SquareRootCalculation } from './SquareRootCalculation';
import { RandomStringCalculation } from './RandomStringCalculation';
import { AddCreditsCalculation } from './AddCreditsCalculation';
import { HttpClientService } from 'src/httpClient/http.client.service';

export interface CalculationInterface {
  calculate(data): any;
}

export const CalculationTypes = {
  ADDITION: 'addition',
  SUBTRACTION: 'subtraction',
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division',
  SQUARE_ROOT: 'square_root',
  RANDOM_IMAGE: 'random_image',
  ADD_CREDITS: 'add_credits',
};

@Injectable()
export class CalculationFactory {
  constructor(private httpClientService: HttpClientService) {}
  public createCalculation(type: string): CalculationInterface {
    switch (type) {
      case CalculationTypes.ADDITION:
        return new AdditionCalculation();
        break;
      case CalculationTypes.SUBTRACTION:
        return new SubstractionCalculation();
        break;
      case CalculationTypes.MULTIPLICATION:
        return new MultiplicationCalculation();
        break;
      case CalculationTypes.DIVISION:
        return new DivisionCalculation();
        break;
      case CalculationTypes.SQUARE_ROOT:
        return new SquareRootCalculation();
        break;
      case CalculationTypes.RANDOM_IMAGE:
        return new RandomStringCalculation(this.httpClientService);
        break;
      case CalculationTypes.ADD_CREDITS:
        return new AddCreditsCalculation();
        break;

      default:
        throw new NotFoundException('Operation Not Found');
        break;
    }
  }
}

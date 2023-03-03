import { HttpClientService } from 'src/httpClient/http.client.service';
import { CalculationInterface } from './calculationFactory';

export class RandomStringCalculation implements CalculationInterface {
  constructor(private httpClientService: HttpClientService) {}
  async calculate(data = 10): Promise<any> {
    const randomString = await this.randomString(data);
    return randomString;
  }
  async randomString(num): Promise<any> {
    const httpClient = this.httpClientService.getHttpService();
    const { data } = await httpClient.get(
      `https://www.random.org/strings/?num=${num}&len=10&loweralpha=on&unique=on&format=plain&rnd=new`,
    );
    return data;
  }
}

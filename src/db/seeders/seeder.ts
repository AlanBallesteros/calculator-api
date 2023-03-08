import { Injectable } from '@nestjs/common';
import OperationSeederService from './operation/operations.seed';
import UserSeederService from './user/users.seed';

@Injectable()
export class Seeder {
  constructor(
    // private readonly logger: Logger,
    private readonly operationSeederService: OperationSeederService,
    private readonly userSeederService: UserSeederService,
  ) {}
  async seed() {
    await this.operations()
      .then((completed) => {
        console.log(completed);
        Promise.resolve(completed);
      })
      .catch((error) => {
        console.log(error, 'error');
        Promise.reject(error);
      });
    await this.users()
      .then((completed) => {
        Promise.resolve(completed);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }
  async operations() {
    const operations = await this.operationSeederService.create();
    return operations;
  }
  async users() {
    const user = await this.userSeederService.create();
    return user;
  }
}

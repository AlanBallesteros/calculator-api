import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpServiceIns: HttpService) {}

  getHttpService() {
    return this.httpServiceIns.axiosRef;
  }
}

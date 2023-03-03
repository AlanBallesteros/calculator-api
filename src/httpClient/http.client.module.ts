import { Module } from '@nestjs/common';
import { HttpClientService } from './http.client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [HttpClientService],
  exports: [HttpClientService],
  imports: [HttpModule],
})
export class HttpClientModule {}

import { Module } from '@nestjs/common';
import { OperationsModule } from './operations/operations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RecordsModule } from './records/records.module';
import { HttpClientModule } from './httpClient/http.client.module';
import configuration from './config/config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviderModule } from './providers/database/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    OperationsModule,
    UsersModule,
    DatabaseProviderModule,
    AuthModule,
    RecordsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

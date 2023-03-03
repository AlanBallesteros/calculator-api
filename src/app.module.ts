import { Module } from '@nestjs/common';
import { OperationsModule } from './operations/operations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operations/entities/operation.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RecordsModule } from './records/records.module';
import { Record } from './records/entities/record.entity';
import { HttpClientModule } from './httpClient/http.client.module';
import configuration from './config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    OperationsModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db.host', 'localhost'),
        port: +configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
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

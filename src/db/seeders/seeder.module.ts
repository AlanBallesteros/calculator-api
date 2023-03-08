import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProviderModule } from 'src/providers/database/provider.module';
import configuration from '../../config/config';
import { OperationSeederModule } from './operation/operations.module';
import { Seeder } from './seeder';
import { UserSeederModule } from './user/users.module';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseProviderModule,
    OperationSeederModule,
    UserSeederModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}

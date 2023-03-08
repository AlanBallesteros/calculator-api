import { NestFactory } from '@nestjs/core';
import { Seeder } from './db/seeders/seeder';
import { SeederModule } from './db/seeders/seeder.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext) => {
      const seeder = appContext.get(Seeder);
      seeder
        .seed()
        .then(() => {
          console.log('complete');
        })
        .catch((error) => {
          console.log('fail');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();

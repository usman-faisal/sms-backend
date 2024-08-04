import { Module } from '@nestjs/common';
import { SalesmenService } from './salesmen.service';
import { SalesmenController } from './salesmen.controller';
import { SalesmenRepository } from './repositories/salesmen.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Salesman, SalesmanSchema } from './schemas/salesman.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Salesman.name, schema: SalesmanSchema },
    ]),
  ],
  controllers: [SalesmenController],
  providers: [SalesmenService, SalesmenRepository],
  exports: [SalesmenRepository, SalesmenService],
})
export class SalesmenModule {}

import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { AreasRepository } from './repositories/areas.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './schemas/area.schema';
import { SalesmenModule } from 'src/salesmen/salesmen.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
    SalesmenModule, // Import the SalesmenModule
  ],
  controllers: [AreasController],
  providers: [AreasRepository, AreasService],
  exports: [AreasRepository],
})
export class AreasModule {}

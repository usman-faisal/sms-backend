import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SalesmenModule } from './salesmen/salesmen.module';
import { OrdersModule } from './orders/orders.module';
import { AreasModule } from './areas/areas.module';
import { ShopsModule } from './shops/shops.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');

        return {
          uri: `mongodb+srv://${username}:${password}@cluster0.gvxdlw2.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    SalesmenModule,
    OrdersModule,
    AreasModule,
    ShopsModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

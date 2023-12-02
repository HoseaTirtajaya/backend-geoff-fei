import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './services/order.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './config/db.config';
import { OrderSales } from './model/order.model';
import { OrderCart } from './model/cart.model';
import { ProductSales } from './model/product.sales.model';
import { CartService } from './services/cart.service';
import { CartController } from './controller/cart.controller';
import { Sequelize } from 'sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true } ),
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([OrderSales, OrderCart, ProductSales])
  ],
  controllers: [OrderController, CartController],
  providers: [OrderService, CartService],
})
export class AppModule {}

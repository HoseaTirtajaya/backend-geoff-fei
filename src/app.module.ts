import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './config/db.config';
import { CartController } from './controller/cart.controller';
import { OrderController } from './controller/order.controller';
import { OrderCart } from './model/cart.model';
import { OrderSales } from './model/order.model';
import { ProductSales } from './model/product.sales.model';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';

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

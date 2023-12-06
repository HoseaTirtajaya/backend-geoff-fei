import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderInvoice } from 'src/interfaces/order.interfaces.dto';
import { OrderCart } from 'src/model/cart.model';
import { OrderSales } from 'src/model/order.model';
import { ProductSales } from 'src/model/product.sales.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderCart) private Cart: typeof OrderCart,
    @InjectModel(ProductSales) private CartItems: typeof ProductSales,
    @InjectModel(OrderSales) private OrderInvoice: typeof OrderSales,
  ) {}


  async createOrderInvoice(payload: CreateOrderInvoice): Promise<any> {
    
  }
}

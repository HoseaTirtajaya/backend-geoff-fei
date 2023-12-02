import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductSales } from 'src/interfaces/cart.interfaces.dto';
import { OrderCart } from 'src/model/cart.model';
import { ProductSales } from 'src/model/product.sales.model';

@Injectable()
export class CartService {

  constructor(
    @InjectModel(OrderCart)
    private Cart: typeof OrderCart,
    @InjectModel(ProductSales)
    private CartItems: typeof ProductSales
  ) {}

  async createCart(): Promise<any> {
    return this.Cart.create({});
  }

  async createCartItems(payload: CreateProductSales): Promise<any> {
    return this.CartItems.create(payload);
  }
}

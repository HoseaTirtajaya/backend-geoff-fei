import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductSales, RemoveItemFromCartRequest, RemoveItemRequest } from 'src/interfaces/cart.interfaces.dto';
import { OrderCart } from 'src/model/cart.model';
import { ProductSales } from 'src/model/product.sales.model';

@Injectable()
export class CartService {

  constructor(
    @InjectModel(OrderCart) private Cart: typeof OrderCart,
    @InjectModel(ProductSales) private CartItems: typeof ProductSales
  ) {}

  async createCart(): Promise<any> {
    return await this.Cart.create({});
  }

  async createCartItems(payload: CreateProductSales): Promise<any> {
    return await this.CartItems.create(payload);
  }

  async readCartData(id: string): Promise<any> {
    return await this.CartItems.findByPk(id, {include: ProductSales})
  }

  async removeItemFromCart(payloadData:{cart_id: number, payload: RemoveItemRequest}): Promise<any> {
    return await this.CartItems.destroy({where: { id: payloadData.payload.id, cart_id: payloadData.cart_id }})
  }

  async deleteCart(cart_id: number): Promise<any> {
    return await this.Cart.destroy({where: {id: cart_id}})
  }
}

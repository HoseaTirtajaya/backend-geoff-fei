import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import sequelizeConfig from 'src/config/db.config';
import { CreateTransactionRequest, OrderPaymentStatus } from 'src/interfaces/order.interfaces.dto';
import { OrderCart } from 'src/model/cart.model';
import { OrderSales } from 'src/model/order.model';
import { ProductSales } from 'src/model/product.sales.model';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(OrderCart) private Cart: typeof OrderCart,
    @InjectModel(OrderSales) private transactionModel: typeof OrderSales,
    @InjectModel(ProductSales) private CartItems: typeof ProductSales
  ){}


  async findExistingInvoiceData(cart_id: number): Promise<any> {
    return await this.transactionModel.findOne({where: {cart_id}});
  }

  async findExistingInvoiceDataByTrxID(id: string): Promise<any> {
    return await this.Cart.findOne({include: { model: OrderSales, where: { transaction_number: id } }});
  }

  async createTransactionData(payload: CreateTransactionRequest): Promise<any> {
    let totalAmount = 0;
    const cartData = await this.Cart.findOne({where: {id: payload.cart_id}, include: { model: ProductSales }})

    for( const item of cartData.dataValues.product_item ){
      let sumAmount: number = item.dataValues.item_qty * item.dataValues.item_amount;
      totalAmount += sumAmount
    }

    return await this.transactionModel.create({...payload, total_amount: totalAmount});
  }

  async updateTransactionStatus(id: string): Promise<any> {
    return await this.transactionModel.update({ payment_status: OrderPaymentStatus.SUCCESS }, {where: { transaction_number: id }});
  }
}

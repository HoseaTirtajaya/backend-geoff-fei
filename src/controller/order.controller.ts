import { Body, Controller, HttpStatus, Patch, Post, Res } from '@nestjs/common';
import { CreateTransactionRequest, UpdateStatusNotification } from 'src/interfaces/order.interfaces.dto';
import { OrderService } from '../services/order.service';
import { CartService } from 'src/services/cart.service';

@Controller("/invoice")
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly cartService: CartService) {}

  @Post("/create")
  async createTransactionInvoice(@Res() res, @Body() payload: CreateTransactionRequest): Promise<any> {
    try{
      const exists = await this.orderService.findExistingInvoiceData(payload.cart_id);

      if(exists){
        return res.status(HttpStatus.OK).json({message: "Success", data: exists});
      } else {
        const invoiceData = await this.orderService.createTransactionData(payload)
        return res.status(HttpStatus.OK).json({message: "Success", data: invoiceData});
      }
    }catch(error){
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Whoops. Error occured"});
    }
  }

  @Post("/update-status")
  async updatePaymentStatus(@Res() res, @Body() body: UpdateStatusNotification): Promise<any> {
    try{
      const exists = await this.orderService.findExistingInvoiceDataByTrxID(body.order_id);

      if(!exists){
        return res.status(HttpStatus.BAD_REQUEST).json({message: "Cannot find data"});
      } else {
        const invoiceData = await this.orderService.updateTransactionStatus(body.order_id);
        const deleteCart = await this.cartService.deleteCart(exists.dataValues.id);
        return res.status(HttpStatus.OK).json({message: "Success"});
      }
    }catch(error){
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Whoops. Error occured"});
    }
  }
}

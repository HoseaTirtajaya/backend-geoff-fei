import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateTransactionRequest } from 'src/interfaces/order.interfaces.dto';

@Controller("/invoice")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Whoops. Error occured"});
    }
  }

  @Patch("/update-status/:id")
  async updatePaymentStatus(@Res() res, @Param('id') invoiceId: string): Promise<any> {
    try{
      const exists = await this.orderService.findExistingInvoiceDataByID(parseInt(invoiceId));

      if(!exists){
        return res.status(HttpStatus.BAD_REQUEST).json({message: "Cannot find data"});
      } else {
        const invoiceData = await this.orderService.updateTransactionStatus(parseInt(invoiceId))
        return res.status(HttpStatus.OK).json({message: "Success"});
      }
    }catch(error){
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Whoops. Error occured"});
    }
  }
}

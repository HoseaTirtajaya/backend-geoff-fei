import { Controller, Get, Patch, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';

@Controller("/invoice")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("/create")
  async createInvoice(): Promise<any> {
    return this.orderService.createOrderInvoice();
  }

  // @Patch("/create")
  // async updateInvoice(): Promise<any> {
  //   return this.orderService.getHello();
  // }
}

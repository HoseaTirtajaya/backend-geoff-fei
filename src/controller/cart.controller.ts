import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCartRequest } from 'src/interfaces/cart.interfaces.dto';
import { CartService } from 'src/services/cart.service';

@ApiTags("Cart Management")
@Controller("/cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

//   @Get("/read")
//   async readCart(): Promise<any> {
//     return this.orderService.getHello();
//   }

  @Post("/create")
  async createCart(@Res() res, @Body() payload: CreateCartRequest): Promise<any> {
    try {
        const cartData = await this.cartService.createCart();
    
        for(const item of payload.product_data){
            await this.cartService.createCartItems({
                cart_id: cartData.dataValues.id,
                item_name: item.product_name,
                item_qty: item.product_qty,
                item_amount: item.product_amount,
                item_code: item.product_code
            });
        }
        return res.status(200).json({message: "Success"})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Whoops. Error Occured"
        });
    }

  }

//   @Patch("/update")
//   async updateCart(): Promise<any> {
//     return this.orderService.getHello();
//   }

//   @Delete("/delete")
//   async deleteCart(): Promise<any> {
//     return this.orderService.getHello();
//   }

}

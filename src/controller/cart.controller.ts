import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddCartRequest, CreateCartRequest, RemoveItemFromCartRequest } from 'src/interfaces/cart.interfaces.dto';
import { CartService } from 'src/services/cart.service';

@ApiTags("Cart Management")
@Controller("/cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get("/read/:id")
  async readCart(@Res() res, @Param('id') cartId: string): Promise<any> {
    const exists = await this.cartService.readCartData(cartId);

    if(!cartId){
      return res.status(HttpStatus.BAD_REQUEST).json({message: "Please fill in the cart information"});
    }
    
    if(!exists){
      return res.status(HttpStatus.NOT_FOUND).json({message: "Your cart is currently empty"});
    }
    
    return res.status(HttpStatus.OK).json({message: "Success", data: exists});
  }

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
        return res.status(200).json({message: "Success", cart_id: cartData.dataValues.id})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Whoops. Error Occured"
        });
    }

  }

  @Patch("/add/item")
  async updateCart(@Res() res, @Body() payload: AddCartRequest): Promise<any> {
    try{
      for(const item of payload.product_data){
        const exists = await this.cartService.readSpecificCartItems({name: item.product_name, product_id: item.product_code})

        if(exists){
          await this.cartService.updateCartItems(exists);
          continue;
        }

        await this.cartService.createCartItems({ 
          cart_id: payload.cart_id,
          item_name: item.product_name,
          item_qty: item.product_qty,
          item_amount: item.product_amount,
          item_code: item.product_code
        });
      }
      return res.status(HttpStatus.OK).json({message: "Success"});
    }catch(error){
      console.log(error)
      return res.status(500).json({
          message: "Whoops. Error Occured"
      });
    }
  }

  @Delete("/remove/item")
  async deleteItemsOnCart(@Res() res, @Body() payload: RemoveItemFromCartRequest): Promise<any> {
    try{
      for(const item of payload.product_data){
        await this.cartService.removeItemFromCart({cart_id: payload.cart_id, payload: item});
      }
      return res.status(HttpStatus.OK).json({message: "Success"});
    }catch(error){
      console.log(error)
      return res.status(500).json({
          message: "Whoops. Error Occured"
      });
    }
  }

  @Delete("/delete/:id")
  async deleteCart(@Res() res, @Param('id') cartId: string): Promise<any> {
    try{
      if(!cartId){
        return res.status(HttpStatus.BAD_REQUEST).json({message: "Please fill in the cart information"});
      }

      await this.cartService.deleteCart(parseInt(cartId));
      return res.status(HttpStatus.OK).json({message: "Success"});
    }catch(error){
      console.log(error)
      return res.status(500).json({
          message: "Whoops. Error Occured"
      });
    }
  }

}

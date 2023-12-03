import { ApiProperty } from "@nestjs/swagger";

export class RemoveItemRequest {
    @ApiProperty()
    id: number

    @ApiProperty()
    product_name: string

    @ApiProperty()
    product_qty: number

    @ApiProperty()
    product_amount: number

    @ApiProperty()
    product_code: string
}

export class CreateProductRequest {
    @ApiProperty()
    product_name: string

    @ApiProperty()
    product_qty: number

    @ApiProperty()
    product_amount: number

    @ApiProperty()
    product_code: string
}

export class CreateCartRequest {
    @ApiProperty({type: CreateProductRequest, isArray: true})
    product_data: CreateProductRequest[];
}

export type CreateProductSales = {
    cart_id: number
    item_name: string
    item_qty: number
    item_amount: number
    item_code: string
}

export class AddCartRequest {
    @ApiProperty()
    cart_id: number;

    @ApiProperty({type: CreateProductRequest, isArray: true})
    product_data: CreateProductRequest[];
}

export class RemoveItemFromCartRequest {
    @ApiProperty()
    cart_id: number;
    
    @ApiProperty({type: RemoveItemRequest, isArray: true})
    product_data: RemoveItemRequest[];
}



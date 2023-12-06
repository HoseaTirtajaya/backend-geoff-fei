import { ApiProperty } from "@nestjs/swagger";

export enum OrderPaymentStatus {
    "PENDING" = 'PENDING',
    "SUCCESS" = 'SUCCESS'
}

export class CreateTransactionRequest {
    @ApiProperty()
    cart_id: number;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    province: string;

    @ApiProperty()
    regency: string;

    @ApiProperty()
    subdistrict: string;

    @ApiProperty()
    village: string;

    @ApiProperty()
    zip_code: string;

    @ApiProperty()
    phone_number: string;

    @ApiProperty()
    payment_method: string;

    @ApiProperty()
    total_amount: string;

    @ApiProperty()
    delivery_courier: string;

    @ApiProperty()
    delivery_charge: number;

}
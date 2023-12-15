import { Column, DataType, HasMany, Model, Table, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { ProductSales } from './product.sales.model';
import {  } from 'sequelize';
import { OrderSales } from './order.model';

@Table({tableName: "order_cart"})
export class OrderCart extends Model<OrderCart> {
//===================DATABASE RELATION=====================================
    @HasMany(() => ProductSales)
    product_item: ProductSales[]

    @HasOne(() => OrderSales)
    cart_detail: OrderSales

//===================DATABASE RELATION=====================================\

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    active: boolean;
}

import { DataType, Column, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { OrderCart } from './cart.model';

@Table({tableName: "product_sales"})
export class ProductSales extends Model<ProductSales> {
    
//===================DATABASE RELATION=====================================

    @BelongsTo(() => OrderCart)
    cart_detail: OrderCart

    @ForeignKey(() => OrderCart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cart_id:number

//===================DATABASE RELATION=====================================
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    item_name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    item_qty: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    item_amount: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    item_code: string;
}

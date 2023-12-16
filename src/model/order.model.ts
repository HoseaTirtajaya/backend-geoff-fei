import * as crypto from 'crypto';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { OrderPaymentStatus } from 'src/interfaces/order.interfaces.dto';
import { OrderCart } from './cart.model';

@Table({tableName: "order_sales"})
export class OrderSales extends Model<OrderSales> {
//===================DATABASE RELATION=====================================
    @ForeignKey(() => OrderCart)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cart_id: number

    @BelongsTo(() => OrderCart, {
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        hooks: true
    })
    cart_detail: OrderCart

//===================DATABASE RELATION=====================================
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string;

    // @Column({
    //     type: DataType.STRING,
    //     allowNull: false
    // })
    // last_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    province: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    regency: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    subdistrict: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    village: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    zip_code: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone_number: string;

    @Column({
        type: DataType.ENUM,
        values: Object.values(OrderPaymentStatus),
        defaultValue: OrderPaymentStatus.PENDING
    })
    payment_status: OrderPaymentStatus;

    @Column({
        type: DataType.STRING,
    })
    payment_method: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    total_amount: number;

    // @Column({
    //     type: DataType.STRING,
    //     allowNull: false
    // })
    // delivery_courier: string

    // @Column({
    //     type: DataType.DECIMAL(10, 2),
    //     allowNull: false
    // })
    // delivery_charge: number;

    @Column({
        type: DataType.STRING,
        defaultValue: () => crypto.randomBytes(24).toString('hex'),
    })
    transaction_number: string;

}

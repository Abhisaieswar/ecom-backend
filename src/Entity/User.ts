import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm"; 
import { Cart } from "./Cart";
import { Orders } from "./Orders";

@Entity()

export class User 
{
    @PrimaryColumn()
    id:number;

    @Column()
    username:string;

    @Column('text',{nullable:true})
    name:String;

    @Column('text',{nullable:true})
    address:String;

    @Column('text',{nullable:true})
    phone:String;

    @Column("text",{nullable:true})
    password:String;

    @OneToMany(()=>Orders,(order)=>order.user)
    orders:Orders[]
    
    @OneToMany(()=>Cart,(cart)=>cart.user)
    cart:Cart[]
}

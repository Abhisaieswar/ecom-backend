import {Entity,PrimaryColumn, Column, ManyToOne} from "typeorm"; 
import { User } from "./User";

@Entity()

export class Cart 
{
    @Column()
    id:number;

    @Column()
    brand:string;

    @Column('text',{nullable:false})
    imageurl:string;

    @Column()
    price: number;

    @Column('numeric',{ nullable: true })
    rating:number;

    @PrimaryColumn()
    uniquecart:string

    @Column()
    title:string;

    @Column()
    quantity:number;

    @Column()
    cartquantity:number;

    @ManyToOne(()=>User,(user)=>user.cart)
    user:User
}

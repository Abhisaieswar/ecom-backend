import {Entity, PrimaryColumn, Column, ManyToOne,PrimaryGeneratedColumn} from "typeorm"; 
import { User } from "./User";

@Entity()

export class Orders 
{
    @PrimaryColumn()
    uniqueorder:string

    @PrimaryGeneratedColumn()
    id:number;

    @Column('text',{nullable:true})
    brand:string;

    @Column('text',{nullable:true})
    imageurl:string;

    @Column('numeric',{nullable:true})
    price: number;

    @Column('numeric',{ nullable: true })
    rating:number;

    @Column()
    title:string;

    @Column('numeric',{ nullable: true })
    quantity:number;

    @Column('numeric',{ nullable: true })
    cartquantity:number;

    @Column('timestamp')
    ordereddate:Date;

    @Column('numeric',{ nullable: true })
    totalamt:number;

    @Column('text',{ nullable: true })
    status:String;

    @ManyToOne(()=>User,(user)=>user.orders)
    user:User
}
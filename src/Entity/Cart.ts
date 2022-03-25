import {Entity,PrimaryColumn, Column} from "typeorm"; 

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
    title:string;

    @Column()
    quantity:number;

    @Column()
    cartquantity:number;
}
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity()

export class Orders 
{
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

    @Column('date',{ nullable: true })
    ordereddate:Date;

    @Column('numeric',{ nullable: true })
    totalamt:number;

    @Column('text',{ nullable: true })
    status:String;
}
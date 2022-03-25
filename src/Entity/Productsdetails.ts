import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Productsdetails{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;

    @Column('text',{ nullable: true })
    imageurl: string;

    @Column()
    price: number;

    @Column('numeric',{ nullable: true })
    rating:number;

    @Column()
    title:string;

    @Column()
    quantity:number;
} 
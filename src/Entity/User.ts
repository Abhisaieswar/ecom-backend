import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"; 

@Entity()

export class User 
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text',{nullable:true})
    name:String;

    @Column('text',{nullable:true})
    address:String;

    @Column('text',{nullable:true})
    phone:String;

}

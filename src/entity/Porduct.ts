import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    codBarra: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    marca: string;

    @Column() 
    stock: number;

    @Column()
    venta: number;

    @Column()
    price: number;
   
    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(()=>Category,(category)=>category.id)
    @IsNotEmpty()//esto es para que no se pueda guardar un producto sin categoria
    @JoinTable()
    categories:Category[];
}
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    @IsNotEmpty()
    name: string;
    @Column()
    description: string;
    @Column()
    price: number;
   
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(()=>Category,(category)=>category.id)
    @JoinTable()
    categories:Category[];
}
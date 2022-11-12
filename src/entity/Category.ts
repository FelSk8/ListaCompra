import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Porduct";
  

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

 
    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(()=>Product,(product)=>product.id)
    products:Product[];
}
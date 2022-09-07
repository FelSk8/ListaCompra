import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm"
import * as bcrypt from 'bcryptjs'

@Entity()
@Unique(["email"])// no se puede repetir el email
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()//campo que no pueden estar vacios
    @IsEmail()// campo que tiene que ser un email
    email: string

    @Column()
    @IsNotEmpty()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    hashPassword():void{// Metodo incriptamos el password
        const salt=bcrypt.genSaltSync(12)
        this.password=bcrypt.hashSync(this.password,salt)//encriptamos el password
    }
    checkPassword(password:string):boolean{//comprobamos el password
        return bcrypt.compareSync(password,this.password)//comparamos el password que nos llega con el que tenemos en la base de datos
    }

   

    
}

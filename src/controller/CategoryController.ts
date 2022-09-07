import { validate } from "class-validator";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";



export class CategoryController{
    static new= async (req:Request,res:Response)=>{//creamos una nueva categoria
        const {name}=req.body;
        const category=new Category();
        category.name=name;
        
        const categoryRepository=AppDataSource.getRepository(Category);
        try {
            await categoryRepository.save(category);//guardamos la categoria
        } catch (e) {
            return res.status(409).json({message:"Category already exist"});
        }
        res.status(200).json("Category created");
    
    }


}
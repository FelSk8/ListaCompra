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

    
//obteber toda las categorias
    static getAll=async(req:Request,res:Response)=>{
        const categoryRepository=AppDataSource.getRepository(Category);
        let categories;
        try {
            categories=await categoryRepository.find();
        } catch (e) {
            return res.status(409).json({message:"Category not found"});
        }
        if(categories.length>0){
            return res.send(categories);
        }else{
              return res.status(404).json({message:"Not result"});
        }
    }
    

    


   

   /* static getAll = async (rep: Request, res: Response) => {

        const categoryRepo = AppDataSource.getRepository(Category);
        let categories;
        try {
            categories = await categoryRepo.find()
        } catch (error) {
            return res.status(401).json({
                message: 'error are find'
            })
        }
        if (categories.length == 0) {
            return res.status(404).json({
                message: 'no category'
            })
        }
        console.log(categories);
        return res.status(200).json({
            message: 'category find',
            categories
        })
    }*/



}


   





import { Request, Response } from "express";
import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { Product } from "../entity/Porduct";



export class ProductContoller{
    static new=async(req:Request,res:Response)=>{
        const {name,price,categories}=req.body;
        const product=new Product();
        product.name=name;
        product.price=price;

        const categoryRepo=AppDataSource.getRepository(Category);
        const productRepository=AppDataSource.getRepository(Product);
        try {
            const contegoryId= await categoryRepo.findBy({id:In(categories)});
            console.log(contegoryId.length);
            if(contegoryId.length==0){
                return res.status(409).json({message:"Category not found"});
            }
            product.name=name;
            product.price=price;
            product.categories=contegoryId;
            
        } catch (error) {
            
        }
        try {
            await productRepository.save(product);
        } catch (e) {
            return res.status(409).json({message:"Product already exist"});
        }
        res.send("Product created");
    }

    static getAll=async(req:Request,res:Response)=>{
        const productRepository=AppDataSource.getRepository(Product);
        let products;
        try {
            products=await productRepository.find(//{relations:["categories"]});
                { relations: ["categories"] }//,where:{id:In([1,2,3])}
            );
        } catch (e) {
            return res.status(409).json({message:"Product not found"});
        }
        if(products.length>0){
            return res.send(products);
        }else{
           return res.status(404).json({message:"Not result"});
        }
    }

    static getById=async(req:Request,res:Response)=>{
        const id=req.params.id;
        const productRepository=AppDataSource.getRepository(Product);
        let product;
        try {
            product=await productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.categories","categories")
            .where("product.id=:id",{id:id})
            .getOne();
            if(product==null){
                return res.status(404).json({message:"Product not found"});
            }
        } catch (error) {
            return res.status(409).json({message:"Product not found"});
        }
        return res.status(200).json(product);
    }

    static update=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const {name,price,categories}=req.body;
        const productRepository=AppDataSource.getRepository(Product);
        const categoryRepo=AppDataSource.getRepository(Category);
        let product;
        try {
            product=await productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.categories","categories")
            .where("product.id=:id",{id:id})
            .getOne();
            if(product==null){
                return res.status(404).json({message:"Product not found"});
            }
        } catch (error) {
            return res.status(409).json({message:"Product not found"});
        }
        try {
            const contegoryId= await categoryRepo.findBy({id:In(categories)});
            console.log(contegoryId.length);
            if(contegoryId.length==0){
                return res.status(409).json({message:"Category not found"});
            }
            product.name=name;
            product.price=price;
            product.categories=contegoryId;
        } catch (error) {
            return res.status(409).json({message:"Product not found"});
        }   
        try {
            await productRepository.save(product);
        } catch (e) {
            return res.status(409).json({message:"Product already exist"});
        }
        res.send("Product updated"); 
    }   

    static delete=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const productRepository=AppDataSource.getRepository(Product);
        let product;
        try {
            product=await productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.categories","categories")
            .where("product.id=:id",{id:id})
            .getOne();
            if(product==null){
                return res.status(404).json({message:"Product not found"});
            }
        } catch (error) {
            return res.status(409).json({message:"Product not found"});
        }
        try {
            await productRepository.remove(product);
        } catch (e) {
            return res.status(409).json({message:"product not found"});
        }
        res.status(200).json({message:"Product deleted"});
    }

    

}

export default ProductContoller
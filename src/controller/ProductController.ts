import { validate } from "class-validator";
import { Request, Response } from "express";
import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { Product } from "../entity/Porduct";



export class ProductContoller{
    static new=async(req:Request,res:Response)=>{
        const {codBarra,name,marca,stock,venta,price,categories}=req.body;
        const product=new Product();
        const categoryRepo=AppDataSource.getRepository(Category);
        product.codBarra=codBarra;
        product.name=name;
        product.marca=marca;
        product.stock=stock;
        product.venta=venta;
        product.price=price;

        try {
            const categoriesId = await categoryRepo.findBy({ id: In(categories) });
            console.log(categoriesId.length);
            if (categoriesId.length == 0) {
                return res.status(400).json({ message: 'categories not found' })
            }
            product.codBarra=codBarra;
            product.name=name;
            product.marca=marca;
            product.stock=stock;
            product.venta=venta;
            product.price=price;
            product.categories=categoriesId;
        } catch (error) {
            return res.status(400).json({
                message: 'categories not found'
            })
        }
        const validationOpt = {
            validationError: {
                target: false,
                value: false
            }
        }
        const errors = await validate(product, validationOpt);
        if (errors.length > 0) {
            return res.status(401).json({
                message: 'input empty'
            })
        }

        const productRepo = AppDataSource.getRepository(Product);
        try {
            await productRepo.save(product)
        } catch (error) {
            return res.status(409).json({
                message: 'product ya existe',
                error
            })
        }
        return res.status(201).json({
            message: 'product create'
        })
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
        const {codBarra,name,marca,stock,venta,price,categories}=req.body;
        const productRepository=AppDataSource.getRepository(Product);
        const categoryRepo=AppDataSource.getRepository(Category);
        let product;
        try {
            product=await productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.categories","categories")
            .where('product.id = :id', { id: parseInt(id) })
            .getOne();
            if(product==null){
                return res.status(404).json({message:"Product not found"});
            }
        } catch (error) {
            return res.status(400).json({message:"Product not found"});
        }
        try {
            const contegoryId= await categoryRepo.findBy({id:In(categories)});
            console.log(contegoryId.length);
            if(contegoryId.length==0){
                return res.status(400).json({message:"Category not found"});
            }
            product.codBarra=codBarra;
            product.name=name;
            product.marca=marca;
            product.stock=stock;
            product.venta=venta;
            product.price=price;
            product.categories=contegoryId;
            console.log(product);
        } catch (error) {
            return res.status(400).json({
                message: 'Category no existe'
            })
        }
        const validationOpt = {
            validationError: {
                target: false,
                value: false
            }
        }
        const errors = await validate(product, validationOpt);
        if (errors.length > 0) {
            return res.status(401).json({
                message: 'input empty'
            })
        }
        try {
            await productRepository.save(product)
        } catch (error) {
            return res.status(409).json({
                message: 'product ya existe',
                error
            })
        }
        return res.status(200).json({
            message: 'product update'
        })
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
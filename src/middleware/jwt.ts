import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import config from "../config/config";

export const checkJwt=(req:Request,res:Response,next:NextFunction) =>{//creamos el middleware
    const token=<string>req.headers['auth'];//obtenemos el token
    console.log(token);//imprimimos el token
    let jwtPayload;
    try {
        jwtPayload=jwt.verify(token,config.jwtSecret);//verificamos el token
        res.locals.jwtPayload=jwtPayload;//guardamos el token en el payload
        console.log(jwtPayload);//imprimimos el payload
        
    } catch (error){
        return res.status(401).json({
            message:'no auth token erroneo',
        })
    }

    const{ userId,email}= jwtPayload//obtenemos el id y el email del payload
    const newToken=jwt.sign({userId,email},config.jwtSecret,{expiresIn:'1h'})//creamos un nuevo token

    res.setHeader('auth',newToken)//enviamos el nuevo token
    next();//pasamos al siguiente middleware



}
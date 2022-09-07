import { json } from "body-parser";
import { Request, Response, response } from "express";
import {  send } from "process";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';//importamos el jsonwebtoken
import config from "../config/config";

  

class AuthController {

    static login = async (req: Request,  res: Response) => {
        const {email,password}=req.body//capturamos el email y password  

        if (!(email && password)) {
            return res.status(409).json({message: 'user & pass are required'})
        }

        const authRepo = AppDataSource.getRepository(User);
        let user:User;
        try {
            user = await authRepo.findOneOrFail({
                where:{
                    email,
                   
                }
            })
        } catch (error) {
            return res.status(452).json({message:'user incorrect'})
        }

        
        if(!user.checkPassword(password)){//comprobamos la contraseña
            return res.status(452).json({message:'passwor incorrect'})
        }
//creamos el token
        const token = jwt.sign({//creamos el token
        userId:user.id,email}, //datos que queremos guardar en el token
        config.jwtSecret,{expiresIn:'1h'}//clave secreta y tiempo de expiracion
        )
        return res.status(200).json({menssage:'login',token})//devolvemos el token

       
       // return res.status(200).json({message:'login'});
    }

}

export default AuthController
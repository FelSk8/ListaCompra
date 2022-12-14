import { Router } from "express";
import user from "./user";
import auth from "./auth";
import category from "./category";
import product from "./product";
import "reflect-metadata";


const routes=Router();

routes.use('/user',user);
routes.use('/auth',auth); //rutas de autenticacion
routes.use('/category',category);
routes.use('/product',product);



export default routes; 
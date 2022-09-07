import { Router } from 'express';
import { CategoryController } from '../controller/CategoryController';



   const router=Router();

  router.post('/',CategoryController.new);//creamos una nueva categoria
  export default router; 
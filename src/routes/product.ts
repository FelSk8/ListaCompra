import { Router } from "express";
import ProductContoller from "../controller/ProductController";


const router = Router();

router.post('/',ProductContoller.new);
router.get('/',ProductContoller.getAll);
router.get('/:id',ProductContoller.getById);
router.delete('/:id',ProductContoller.delete);
router.patch('/:id',ProductContoller.update);

export default router;
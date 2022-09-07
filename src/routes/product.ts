import { Router } from "express";
import ProductContoller from "../controller/ProductController";


const router = Router();

router.post('/',ProductContoller.new);
router.get('/',ProductContoller.getAll);
router.get('/:id',ProductContoller.getById);
router.patch('/:id',ProductContoller.update);
router.delete('/:id',ProductContoller.delete);
export default router;
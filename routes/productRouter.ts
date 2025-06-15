import express from "express";
import * as ProductController from "../controller/product.controller";


const router = express.Router();

router.post('/productCreate',ProductController.productCreate);
router.put('/:id',ProductController.productUpdate);
router.delete('/:id',ProductController.productDelete);
router.get('/view',ProductController.productsGetAll);
router.get('/:id',ProductController.productGet);


export default router;
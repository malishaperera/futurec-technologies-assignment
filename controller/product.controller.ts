import dotenv from 'dotenv';
import { Request, Response } from 'express';
import {Product} from "../models/Product";
import {
    createProduct,
    deleteProduct, getAllProducts,
    isProductCredentials,
    updateProduct
} from "../database/product-client";


dotenv.config();

export const productCreate = async(req:Request,res:Response):Promise<any> => {
    const {name,price,quantity} = req.body;

    try{
        if (!name || price == null || quantity == null) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const product: Product = {
            name,
            price,
            quantity
        };
        const newProduct = await createProduct(product);
        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    }catch (err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const productUpdate = async(req:Request,res:Response):Promise<any> => {
    const productId = req.params.id;
    const {name, price, quantity} = req.body;

    try {
        const isProduct = await isProductCredentials(productId);
        if (!isProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await updateProduct(productId, { name, price, quantity });
        return res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const productDelete = async(req:Request,res:Response):Promise<any> => {
    const productId = req.params.id;

    try {
        const isProduct = await isProductCredentials(productId);
        if (!isProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const deleteCar = await deleteProduct(productId);
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const productsGetAll = async(req:Request,res:Response):Promise<any> => {
    try {
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const productGet = async(req:Request,res:Response):Promise<any> => {
    const productId = req.params.id;

    try {
        const product = await isProductCredentials(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
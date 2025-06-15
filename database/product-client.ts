import {PrismaClient} from "@prisma/client";
import {Product} from "../models/Product";
import {generateProductId} from "./util/generateID.controller";

const prisma = new PrismaClient();

export async function createProduct(product: Product) {
    try {
        const newProductId = await generateProductId();
        const addedProduct = await prisma.product.create({
            data: {
                productId: newProductId,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            }
        });
        console.log("Product created:", addedProduct);
        return addedProduct;
    } catch (err) {
        console.error('Error in createProduct:', err);
        throw new Error('Error creating product');
    }
}

export async function updateProduct(productId: string, product: Product) {
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                productId: productId,
            },
            data: {
                name: product.name,
                price: product.price,
                quantity: product.quantity
            },
        });
        return updatedProduct;

    } catch (err) {
        console.error('Error in updateProduct:', err);
        throw new Error('Error updating product');
    }
}

export async function deleteProduct(productId: string) {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                productId: productId,
            },
        });
        return deletedProduct;
    } catch (err) {
        console.error('Error in deleteProduct:', err);
        throw new Error('Error deleting product');
    }
}

export async function getAllProducts() {
    try {
        const products = await prisma.product.findMany();
        return products;
    } catch (err) {
        console.error('Error in updateProduct:', err);
        throw new Error('Error updating product');
    }
}

export async function isProductCredentials(productId: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { productId: productId }
        });
        return product;
    } catch (err) {
        console.error('Error in isProductCredentials:', err);
        throw new Error('Error checking product credentials');
    }
}
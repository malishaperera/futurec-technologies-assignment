import {PrismaClient} from "@prisma/client";
import {Product} from "../models/Product";

const prisma = new PrismaClient();

export async function createProduct(product: Product) {
    try {
        const addedProduct = await prisma.product.create({
            data: {
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

export async function updateProduct(productId: number, product: Product) {
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId,
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

export async function deleteProduct(productId: number) {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: productId,
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

export async function isProductCredentials(productId: number) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });
        return product;
    } catch (err) {
        console.error('Error in isProductCredentials:', err);
        throw new Error('Error checking product credentials');
    }
}
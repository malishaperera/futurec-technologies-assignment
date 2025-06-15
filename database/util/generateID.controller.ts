import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//ProductId
export async function generateProductId(): Promise<string> {

    const lastProduct = await prisma.product.findFirst({
        orderBy: { productId: 'desc' },
    });

    let nextId = "PR-001";
    if (lastProduct && lastProduct.productId) {
        const lastIdNumber = parseInt(lastProduct.productId.split("-")[1], 10);
        const newIdNumber = lastIdNumber + 1;
        nextId = `PR-${String(newIdNumber).padStart(3, "0")}`;
    }
    return nextId;
}

//UserId
export async function generateUserId(): Promise<string> {
    const lastUser = await prisma.user.findFirst({
        orderBy: { userId: 'desc' },
    });

    let nextId = "U001";
    if (lastUser && lastUser.userId) {
        const lastIdNumber = parseInt(lastUser.userId.slice(1), 10); // remove 'U' and parse number
        const newIdNumber = lastIdNumber + 1;
        nextId = `U${String(newIdNumber).padStart(3, "0")}`;
    }

    return nextId;
}














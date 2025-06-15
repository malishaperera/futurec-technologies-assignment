import {PrismaClient} from "@prisma/client";
import {User} from "../models/User";
import {generateUserId} from "./util/generateID.controller";

const prisma = new PrismaClient();

export async function createUser(user: User) {
    try {
        const newProductId = await generateUserId();
        const addedUser = await prisma.user.create({
            data: {
                userId: newProductId,
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
        console.log("User created:", addedUser);
        return addedUser;
    } catch (err) {
        console.error('Error in createUser:', err);
        throw new Error('Error creating user');
    }
}

export async function verifyUserCredentials(email:string){
    try{

        let user = await prisma.user.findUnique({
            where: { email: email }
        });
        return user;
    }catch (err){
        console.error('Error in verifyUserCredentials:', err);
        throw new Error('Error verifying user credentials');
    }
}
import {PrismaClient} from "@prisma/client";
import {User} from "../models/User";


const prisma = new PrismaClient();

export async function createUser(user: User) {
    try {
        const addedUser = await prisma.user.create({
            data: {
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
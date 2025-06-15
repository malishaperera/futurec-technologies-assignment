import dotenv from "dotenv";
import {createUser, verifyUserCredentials} from "../database/user-client";
import {Request, Response} from "express";
import bcrypt from 'bcrypt';


dotenv.config();

//user registration
export const registerUser = async (req: Request, res: Response): Promise<any> => {
    const {name, email, password} = req.body;

    try {

        let registration = await verifyUserCredentials(email);

        if (registration != null) {
            return res.status(401).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({name, email, password: hashedPassword});
        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (err) {
        console.error("Error in registerUser:", err);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: err,
        });
    }
}

//user login
export const userLogin = async (req:Request, res:Response): Promise<any> => {

    const {email, password} = req.body;

    try{

        let isUser = await verifyUserCredentials(email);

        if(!isUser){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const isMatchUserPassword = await bcrypt.compare(password, isUser.password);

        if (!isMatchUserPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({
            message: "Login successful",
            user: {
                name: isUser.name,
                email: isUser.email,
            }
        });

    }catch (err){
        return res.status(500).json({message: "Internal server error"});
    }
}
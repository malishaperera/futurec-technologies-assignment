import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import UserRouter from "./routes/userRouter";
import ProductRouter from "./routes/productRouter";

dotenv.config();

const app = express();

app.use(express.json());


app.use("/api/user",UserRouter);
app.use("/api/product",ProductRouter)

app.listen(3003, () => {
    console.log("Server running on port 3003");
});
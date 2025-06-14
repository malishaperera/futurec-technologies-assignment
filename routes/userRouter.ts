import express from "express";
import * as UserController from "../controller/user.controller";

const router = express.Router();

router.post('/userRegister',UserController.registerUser);
router.post('/userLogin',UserController.userLogin);

export default router;
import { Router } from "express";
import { create } from "./user.controller";

const router = Router();

router.post('/', create)

export {router as userRoutes}
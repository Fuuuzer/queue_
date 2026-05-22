import { Router } from "express";
import { create, list } from "./user.controller";

const router = Router();

router.get('/', list);
router.post('/', create);

export {router as userRoutes}
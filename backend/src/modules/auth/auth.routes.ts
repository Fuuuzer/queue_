import { Router } from "express";
import { validate } from "./auth.controller";

const router = Router();

router.post('/login', validate);
router.get('/me', validate)
// console.log('teste')

export {router as authRoutes}

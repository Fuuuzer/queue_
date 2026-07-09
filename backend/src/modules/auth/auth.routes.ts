import { Router } from "express";
import { validate, validateMe } from "./auth.controller";
import { authHandler } from "../../middlewares/authVerify";

const router = Router();

router.post('/login', validate);
router.get('/me', authHandler, validateMe)
// console.log('teste')

export {router as authRoutes}

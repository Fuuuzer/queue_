import { Router } from "express";

const router = Router();

router.get('/login', validateUser)

export {router as authRoutes}

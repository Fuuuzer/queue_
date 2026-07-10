import { Router } from "express";
import { create, list, update, remove } from "./ticket.controller";
import { authHandler } from "../../middlewares/authVerify";

const router = Router();

// router.get('/')

router.post('/', authHandler, create);
router.get('/', authHandler,  list);
router.patch('/:id/status', authHandler, update);
router.delete('/:id', authHandler, remove);
// router.get('/', )

export {router as ticketRoutes}
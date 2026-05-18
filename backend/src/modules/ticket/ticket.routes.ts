import { Router } from "express";
import { create, list, update } from "./ticket.controller";

const router = Router();

// router.get('/')

router.post('/', create)
router.get('/', list)
router.patch('/:id/status', update)
// router.get('/', )

export {router as ticketRoutes}
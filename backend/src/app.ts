import express from "express";
import { ticketRoutes } from "./modules/ticket/ticket.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use('/tickets', ticketRoutes)
app.use(errorHandler);
export default app;
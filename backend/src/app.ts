import express from "express";
import { ticketRoutes } from "./modules/ticket/ticket.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoutes } from "./modules/user/user.routes";

const app = express();

app.use(express.json());
app.use('/tickets', ticketRoutes);
app.use('/users', userRoutes);
app.use('/auth', userRoutes);
app.use(errorHandler);
export default app;
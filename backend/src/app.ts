import express from "express";
import cors from "cors";
import { ticketRoutes } from "./modules/ticket/ticket.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
app.use(cors());

app.use(express.json());
app.use('/tickets', ticketRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use(errorHandler);



export default app;
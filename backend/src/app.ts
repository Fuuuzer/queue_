import express from "express";
import { ticketRoutes } from "./modules/ticket/ticket.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoutes } from "./modules/user/user.routes";
import { userValidaTest } from "./modules/auth/auth.service";

const app = express();

app.use(express.json());
app.use('/tickets', ticketRoutes)
app.use('/users', userRoutes)
// app.use('/auth', validateRoutes)
app.use(errorHandler);

console.log(userValidaTest)



export default app;
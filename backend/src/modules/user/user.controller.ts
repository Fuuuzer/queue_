import { Request, Response } from "express";
import { createUser } from "./user.service";


export const create = async(
  req: Request,
  res: Response
) => {
  const user = await createUser(req.body);
  res.status(201)
  .json({
    success: true,
    data: user,
    message: 'Usuário criado com sucesso!'
  })
}
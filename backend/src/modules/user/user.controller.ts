import { Request, Response } from "express";
import { createUser, getUsers } from "./user.service";


export const create = async(
  req: Request,
  res: Response
) => {
  console.log('controller')
  const user = await createUser(req.body);
  res.status(201)
  .json({
    success: true,
    data: user,
    message: 'Usuário criado com sucesso!'
  })
}

export const list = async(
  req: Request,
  res: Response
) => {
  
  const user = await getUsers(req.body);
  res.status(201)
  .json({
    success: true,
    data: user,
    message: 'Listando usuários'
  })
}
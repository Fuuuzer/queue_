import { Request, Response } from "express";
import { createUser, getUsers } from "./user.service";
import { generateToken } from "../token/token";


export const create = async(
  req: Request,
  res: Response
) => {
  // console.log('controller')
  const user = await createUser(req.body);
  const token = generateToken({id: user.id, role: user.role})
  res.status(201)
  .json({
    success: true,
    data: {user, token},
    message: 'Usuário criado com sucesso!',
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
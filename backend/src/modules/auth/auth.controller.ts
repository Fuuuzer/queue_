import { userValidate } from "./auth.service";
import { generateToken } from "../token/token";
import { Request, Response } from "express";

export const validate = async(
  req: Request,
  res:  Response
) => {
  const { user } = await userValidate(req.body);
  const token = generateToken({id: user.id, role: user.role})
  res.status(201)
  .json({
    success: true, 
    data: {user, token},
    message: 'fazendo login'
  });
}

export const validateMe = async(
  req: Request,
  res: Response
) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
    message: 'usuário autenticado'
  });
}
import { userValidate } from "./auth.service";
import { Request, Response } from "express";


export const validate = async(
  req: Request,
  res:  Response
) => {
  const user = await userValidate(req.body);
  res.status(201)
  .json({
    success: true, 
    data: user,
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
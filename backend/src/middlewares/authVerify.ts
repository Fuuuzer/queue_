import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import AppError from "../errors/AppError";

export function authHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader); //usado para debugar o token que vem no header da requisição
  if(!authHeader) {
    throw new AppError('Erro sem header authorization', 401)
  }
  const token = authHeader.split(' ')[1];

  if(!token) {
    throw new AppError('Erro nao tem token', 401)
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = tokenDecoded as TokenPayload;
    next()
  } catch (err) {
      console.log(err)
      throw new AppError('Não autorizado', 401)
  }
}
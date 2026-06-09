import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import AppError from "../errors/AppError";

export function authHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    throw new AppError('Erro', 401)
  }
  const token = authHeader.split(' ')[1];

  if(!token) {
    throw new AppError('Erro', 401)
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET!)

    req.user = tokenDecoded;
    next()
  } catch {
    throw new AppError('Não autorizado', 401)
  }


}
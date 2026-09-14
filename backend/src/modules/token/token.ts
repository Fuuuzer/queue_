import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

interface TokenPayload{
  id: string;
  role: Role;
}

export const generateToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!,{expiresIn: '1d'})
  return token
}
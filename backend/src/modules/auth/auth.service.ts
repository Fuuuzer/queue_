import bcrypt from "bcryptjs";
import { prisma } from "../../database/prisma";
import AppError from "../../errors/AppError";
import jwt from 'jsonwebtoken';

export const userValidate = async (data:
  {email: string; password:string;} ) => {
    if(!data.email || !data.password) {
      throw new AppError("digite algo primeiro", 404)
    }
  const hasUser = await prisma.user.findUnique({
      where:{
        email: data.email
      }
    })   

  if(!hasUser) {
  throw new AppError('usuario invalido', 404)
}
const validate = await bcrypt.compare(data.password, hasUser.password)

if(!validate) {
  throw new AppError('usuario invalido 2', 404);
} 

const token = jwt.sign(
{
  sub: hasUser.id,
  role: hasUser.role
},
process.env.JWT_SECRET!,
{
  expiresIn: '1d'
}
)

return {
  token,
    user: {
    id: hasUser.id,
    name: hasUser.name,
    role: hasUser.role
  }
}
}
import bcrypt from "bcryptjs";
import { prisma } from "../../database/prisma";
import AppError from "../../errors/AppError";

export const userValidate = async (data:
  {email: string; password:string;} ) => {
    if(!data.email || !data.password) {
      throw new AppError("É necessário informar os dados de login", 400)
    }
  const hasUser = await prisma.user.findUnique({
      where:{
        email: data.email
      }
    })   

  if(!hasUser) {
  throw new AppError('usuario invalido', 401)
}
const validate = await bcrypt.compare(data.password, hasUser.password)

if(!validate) {
  throw new AppError('usuario invalido', 401);
} 

return {
    user: {
    id: hasUser.id,
    name: hasUser.name,
    role: hasUser.role
  }
}
}
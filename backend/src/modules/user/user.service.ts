import { prisma } from "../../database/prisma";
import AppError from "../../errors/AppError";
import bcrypt from 'bcryptjs'


export const createUser = async (data: {
  name: string;
  email: string;
  password: string
}) => {
  if(!data.name || !data.email || !data.password){
    throw new AppError('É necessário preencher um nome, email e senha.', 400)
  }
  const userExists = await prisma.user.findUnique({ 
    where: {
      email: data.email
    }
  })

  if(userExists) {
    throw new AppError('nao foi possivel cadastrar o usuario', 409) 
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

   return await prisma.user.create({ 
    data: 
    {
    name: data.name,
    email: data.email,
    password: hashedPassword,
   },
   select: {name: true, email: true}
})
}
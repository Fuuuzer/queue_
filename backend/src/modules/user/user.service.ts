import { prisma } from "../../database/prisma";
import AppError from "../../errors/AppError";


export const createUser = async (data: {
  name: string;
  email: string;
  password: string
}) => {
  if(!data.name || !data.email || !data.password){
    throw new AppError('É necessário preencher um nome, email e senha.', 400)
  }
  await prisma.user.create({ data: {
    name: data.name,
    email: data.email,
    password: data.password,
  }})
}
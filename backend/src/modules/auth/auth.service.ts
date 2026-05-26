import bcrypt from "bcryptjs";
import { prisma } from "../../database/prisma";
import AppError from "../../errors/AppError";


export const userValidate = async (data:
  {email: string; hashedPassword:string;} ) => {
  console.log(data.hashedPassword)
  // if(data.hashedPassword === )
  // await prisma.user.findUnique({
  //   // where:{email}
  // })
}

export const userValidaTest =  async function test(email:string){
const hasUser = await prisma.user.findUnique({
  where: {email}
})

if(!hasUser) {
  return console.error('filho da puta nao tem esse usuario')
}
const validate =  await bcrypt.compare('123456', hasUser.password)
console.log(validate)

}

console.log(userValidaTest('joao123@gmail.com'));
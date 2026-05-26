import bcrypt from "bcryptjs";
import { prisma } from "../../database/prisma";
import AppError from "../../errors/AppError";


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
  throw new AppError('usuario invalido 2', 404)
} 
return hasUser

}


// export const userValidaTest =  async function test(email:string){
// const hasUser = await prisma.user.findUnique({
//   where: {email}
// })

// if(!hasUser) {
//   return console.error('filho da puta nao tem esse usuario')
// }
// const validate =  await bcrypt.compare('123456', hasUser.password)
// console.log(validate)
// if(validate) {
//   console.log('usuario criado');
// }

// }
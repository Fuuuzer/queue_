import instance from "./api";

//nomes de interface começam com letra maiuscula
interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  role: string;
}

interface UserData {
  token: string;
  user: User;
}

interface ResponseApi {
  success: boolean;
  data: UserData;
  message: string
}



export const AuthLogin = async (credentials: LoginCredentials) => { // o tipo aqui ele puxa exatamente o que foi colocado dentro da interface

  const response = await instance.post('/auth/login', {email: 'joaofuzer@gmail.com', password:'12345'});
  const {data: loginData, message: loginMessage} = response.data;

  console.log(loginData, loginMessage)
}
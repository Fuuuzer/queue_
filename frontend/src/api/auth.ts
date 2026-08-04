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

interface LoginData {
  token: string;
  user: User;
}

interface ResponseApi {
  success: boolean;
  data: LoginData;
  message: string
}

export const AuthLogin = async (credentials: LoginCredentials) => { // o tipo aqui ele puxa exatamente o que foi colocado dentro da interface
  const response = await instance.post<ResponseApi>('/auth/login', credentials);
  const {data: loginData, message: loginMessage} = response.data;

  return {token:loginData.token, user: loginData.user, message: loginMessage};
}
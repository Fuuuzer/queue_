import instance from "./api";

//nomes de interface
interface LoginCredentials {
  email: string;
  password: string;
}

export const AuthLogin = async (credentials: LoginCredentials) => { // o tipo aqui ele puxa exatamente o que foi colocado dentro da interface
  const user = await instance.post('/auth/login', credentials)

  return user
}
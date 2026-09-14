import instance from "./api";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserData {
  user: User;
  token: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserData {
  user: User;
  token: string;
}

interface ResponseApi {
  success: boolean;
  data: RegisterUserData;
  message: string
}

export const RegisterUser = async (credentials: RegisterCredentials) => {
  const response = await instance.post<ResponseApi>('/users', credentials);
  return response
}


export const CreateUser = async (registerUserCredentials: RegisterCredentials) => {

  const response = await instance.post<ResponseApi>('/users', registerUserCredentials);
  const {data: userData, message: userMessage} = response.data;
  return {user: userData.user, message: userMessage, token: userData.token}
}
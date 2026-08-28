import instance from "./api";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface RegisterData {
  token: string;
  user: User;
}

interface ResponseApi {
  success: boolean;
  data: RegisterData;
  message: string
}

export const CreateUser = async (registerUserCredentials: RegisterCredentials) => {

  const response = await instance.post<ResponseApi>('/users', registerUserCredentials);
  const {data: userData, message: userMessage} = response.data;

  return {user: userData.user, message: userMessage, token: userData.token}
}
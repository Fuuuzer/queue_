import instance from "./api";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserData {
  email: string;
  name: string
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
import instance from "./api";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export const CreateUser = async (registerUserCredentials: RegisterCredentials) => {

  const response = await instance.post('/users', registerUserCredentials);
  console.log(response)
}
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  exp: number;
  iat?: number;
  userId?: string;
}

export const isTokenExpired = (token: string | null): boolean => {
  if(!token) return true
  try {
    const decoded= jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000); //sem transformar o currentTime para segundos o token sempre iria estar expirado

    return decoded.exp < currentTime;
  } catch (err) {
    return true
  }
}
import jwt from 'jsonwebtoken';

export const generateToken = (id: string, role?: string) => {
  const token = jwt.sign(
  {
    sub: id,
    role: role
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: '1d'
  }
  )
  
  return token
}
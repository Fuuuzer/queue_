declare global {
  interface JwtPayload {
    sub: string;
    role: 'USER' | 'SUPPORT' | 'ADMIN'
  }
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
}

export {}
declare global {
  interface JwtPayload {
    sub: string;
    role: 'USER' | 'SUPPORT' | 'ADMIN'
  }

  type UserRole = 'USER' | 'ADMIN' | 'SUPPORT';
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
}

export {}
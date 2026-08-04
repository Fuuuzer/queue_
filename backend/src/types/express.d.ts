declare global {
  interface TokenPayload {
    sub: string;
    role: 'USER' | 'SUPPORT' | 'ADMIN'
  }

  type UserRole = 'USER' | 'ADMIN' | 'SUPPORT';
  namespace Express {
    interface Request {
      user: TokenPayload
    }
  }
}

export {}
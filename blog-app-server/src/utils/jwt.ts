import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export interface IJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

const createToken = (
  payload: IJwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);

  return token;
};

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret) as IJwtPayload;
    return verifiedToken;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const jwtUtils = {
  createToken,
  verifyToken,
};

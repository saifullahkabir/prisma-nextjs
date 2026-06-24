import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";

export interface IJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: Role;
}

const createToken = (
  payload: IJwtPayload,
  secret: string,
  expiresIn: SignOptions["expiresIn"],
) => {
  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
};

const verifyToken = (token: string, secret: string) => {
  const verifiedToken = jwt.verify(token, secret) as IJwtPayload;
  return verifiedToken;
};

export const jwtUtils = {
  createToken,
  verifyToken,
};

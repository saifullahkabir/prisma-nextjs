import { NextFunction, Request, Response } from "express";
import { ActiveStatus, Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";

export const auth = (...roles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error(
        "You are not logged in. Please log in to access this resource.",
      );
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    const { id, name, email, role } = verifiedToken;

    if (roles.length && !roles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource",
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found. Please login again.");
    }

    if (user.activeStatus === ActiveStatus.BLOCKED) {
      throw new Error("Your account has been blocked. Please contact support.");
    }

    req.user = {
      id,
      name,
      email,
      role,
    };

    next();
  });
};

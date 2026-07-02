import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import config from "../config";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = (err as Error).message || "Internal Server Error";
  let errorName = (err as Error).name || "Internal Server Error";

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = HttpStatus.BAD_REQUEST;
    errorMessage =
      "Invalid request data. Please check the provided fields and their values.";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = HttpStatus.CONFLICT;
      errorMessage = "Duplicate value.";
    } else if (err.code === "P2003") {
      statusCode = HttpStatus.BAD_REQUEST;
      errorMessage = "Foreign key constraint failed.";
    } else if (err.code === "P2025") {
      statusCode = HttpStatus.NOT_FOUND;
      errorMessage = "Record not found.";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = HttpStatus.UNAUTHORIZED;
      errorMessage = "Authentication failed. Please check your credentials.";
    } else if (err.errorCode === "P1001") {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = "Can't reach database server.";
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution.";
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: errorMessage,
    name: errorName,
    error: config.node_env === "development" ? (err as Error).stack : undefined,
  });
};

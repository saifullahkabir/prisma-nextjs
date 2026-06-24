import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await authService.loginUser(payload);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "User logged in successfully",
      data: result,
    });
  },
);

export const authController = {
  loginUser,
};
 
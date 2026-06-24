import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";


const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    res.status(HttpStatus.CREATED).json({
      succss: true,
      statusCode: HttpStatus.CREATED,
      message: "User registered successfully",
      data: { user },
    });
  },
);

export const userController = {
  registerUser,
};

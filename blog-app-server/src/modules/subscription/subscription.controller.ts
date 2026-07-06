import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { subscriptionService } from "./subscription.service";
import { sendResponse } from "../../utils/sendResponse";

const createCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const result = await subscriptionService.createCheckoutSession(userId);

    return sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Checkout completed successfully",
      data: result,
    });
  },
);

export const subscriptionController = {
  createCheckoutSession,
};

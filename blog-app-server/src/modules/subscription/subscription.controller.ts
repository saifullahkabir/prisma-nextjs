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

const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer;
    const signature = req.headers["stripe-signature"] as string;

    await subscriptionService.handleWebhook(event, signature);

    return sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Webhook triggered successfully",
      data: null,
    });
  },
);

const getSubscriptionStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const result = await subscriptionService.getSubscriptionStatus(userId);

    return sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Subscription status retrieved successfully",
      data: result,
    });
  },
);

export const subscriptionController = {
  createCheckoutSession,
  handleWebhook,
  getSubscriptionStatus,
};

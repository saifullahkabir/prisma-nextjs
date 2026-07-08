import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { premiumService } from "./premium.service";

const getPremiumContent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await premiumService.getPremiumContent(query);

    return sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Premium content retrieved successfully",
      data: result.data,
      meta: result.meta
    });
  },
);

export const premiumController = {
  getPremiumContent,
};

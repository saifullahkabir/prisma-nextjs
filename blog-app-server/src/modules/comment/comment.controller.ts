import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";

const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const result = await commentService.createComment(req.body, userId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "Comment created successfully",
      data: result,
    });
  },
);

const getCommentByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId as string;

    const result = await commentService.getCommentByAuthorId(authorId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Author comments retrieved successfully",
      data: result,
    });
  },
);

const getCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const moderateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const commentController = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};

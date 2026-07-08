import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import { Role } from "../../../generated/prisma/enums";

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

const getCommentByPostId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId as string;

    const result = await commentService.getCommentByPostId(postId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Comment retrieved successfully",
      data: result,
    });
  },
);

const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId as string;
    const payload = req.body;
    const authorId = req.user?.id as string;

    const result = await commentService.updateComment(
      commentId,
      payload,
      authorId,
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Comment updated successfully",
      data: result,
    });
  },
);

const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId as string;
    const authorId = req.user?.id as string;

    await commentService.deleteComment(commentId, authorId);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Comment deleted successfully",
      data: null,
    });
  },
);

const moderateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId as string;
    const payload = req.body;

    const result = await commentService.moderateComment(commentId, payload);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Comment moderated successfully",
      data: result,
    });
  },
);

export const commentController = {
  createComment,
  getCommentByAuthorId,
  getCommentByPostId,
  updateComment,
  deleteComment,
  moderateComment,
};

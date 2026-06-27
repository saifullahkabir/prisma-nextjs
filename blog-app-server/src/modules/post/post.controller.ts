import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import { Role } from "../../../generated/prisma/enums";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await postService.createPost(req.body, userId as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "Post created successfully",
      data: result,
    });
  },
);

const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postService.getAllPosts();

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Posts retrieved successfully",
      data: posts,
    });
  },
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    const result = await postService.getPostById(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Post retrieved successfully",
      data: result,
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId as string;
    const payload = req.body;

    const authorId = req.user?.id as string;
    const isAdmin = req.user?.role === Role.ADMIN;

    const result = await postService.updatePost(
      postId,
      payload,
      authorId,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Post updated successfully",
      data: result,
    });
  },
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId as string;

    const authorId = req.user?.id as string;
    const isAdmin = req.user?.role === Role.ADMIN;

    await postService.deletePost(postId, authorId, isAdmin);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Post deleted successfully",
      data: null,
    });
  },
);

const getPostsStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getMyPosts(req.user!.id);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "My Posts retrieved successfully",
      data: result,
    });
  },
);

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStats,
  getMyPosts,
};

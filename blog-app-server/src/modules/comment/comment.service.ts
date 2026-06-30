import { prisma } from "../../lib/prisma";
import {
  ICreateComment,
  IModerateComment,
  IUpdateComment,
} from "./comment.interface";

const createComment = async (payload: ICreateComment, userId: string) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  const createComment = await prisma.comment.create({
    data: {
      ...payload,
      authorId: userId,
    },

    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return createComment;
};

const getCommentByAuthorId = async (authorId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      authorId,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return result;
};

const getCommentByCommentId = async (commentId: string) => {
  const result = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },

    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });

  return result;
};

const updateComment = async (
  commentId: string,
  payload: IUpdateComment,
  authorId: string,
) => {
  const commentExists = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },

    select: {
      id: true,
    },
  });

  if (!commentExists) {
    throw new Error("Comment not found!");
  }

  const result = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: payload,
  });

  return result;
};

const deleteComment = async (commentId: string, authorId: string) => {
  await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  const result = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return null;
};

const moderateComment = async (
  commentId: string,
  payload: IModerateComment,
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (commentData.status === payload.status) {
    throw new Error(
      `Your provided status (${payload.status}) is already up to date.`,
    );
  }

  const result = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: payload,
  });

  return result;
};

export const commentService = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};

import { prisma } from "../../lib/prisma";
import { ICreateComment } from "./comment.interface";

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

const updateComment = () => {};

const deleteComment = () => {};

const moderateComment = () => {};

export const commentService = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};

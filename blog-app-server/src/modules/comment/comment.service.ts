import { prisma } from "../../lib/prisma";
import { ICreateComment } from "./comment.interface";

const createComment = async (payload: ICreateComment, userId: string) => {
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

const getCommentByAuthorId = () => {};

const getCommentByCommentId = () => {};

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

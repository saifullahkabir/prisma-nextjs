import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPayload {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus;
  tags?: string[];
}

export interface IUpdatePostPayload {
  title?: string;
  content?: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus;
  tags?: string[];
}

export interface IPostQuery {
  searchTerm?: string;
  title?: string;
  content?: string;
  authorId?: string;

  isFeatured?: string;
  status?: string;
  tags?: string;

  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
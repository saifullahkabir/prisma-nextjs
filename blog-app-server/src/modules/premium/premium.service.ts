import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IPostQuery } from "../post/post.interface";

const getPremiumContent = async (query: IPostQuery) => {
  const limit = query.limit ? Number(query.limit) : 9;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: PostWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (query.title) {
    andConditions.push({
      title: query.title,
    });
  }

  if (query.content) {
    andConditions.push({
      content: query.content,
    });
  }

  if (query.authorId) {
    andConditions.push({
      authorId: query.authorId,
    });
  }

  if (query.isFeatured) {
    andConditions.push({
      isFeatured: query.isFeatured === "true",
    });
  }

  if (query.tags) {
    const parsedTags =
      typeof query.tags === "string" ? JSON.parse(query.tags) : query.tags;

    andConditions.push({
      tags: {
        hasSome: parsedTags,
      },
    });
  }

  if (query.status) {
    andConditions.push({
      status: query.status as PostStatus,
    });
  }

  andConditions.push({
    isPremium: true,
  });

  const posts = await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
    
    //* pagination
    take: limit,
    skip: skip,

    //* sorting
    orderBy: {
      [sortBy]: sortOrder,
    },

    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  const totalPostCount = await prisma.post.count({
    where: {
      AND: andConditions,
    },
  });

  const totalPages = Math.ceil(totalPostCount / limit);

  return {
    data: posts,
    meta: {
      page: page,
      limit: limit,
      totalPosts: totalPostCount,
      totalPages,
    },
  };
};

export const premiumService = {
  getPremiumContent,
};

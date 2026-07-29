export type IPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type IAuthor = {
    id: string;
    name: string;
    email: string;
    activeStatus: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type IComment = {
    id: string;
    content: string;
    status: string;
    postId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
};

export type IPost = {
    id: string;
    title: string;
    content: string;
    thumbnail: string | null;
    isFeatured: boolean;
    status: IPostStatus;
    tags: string[];
    views: number;
    isPremium: boolean;
    authorId: string;
    author?: IAuthor;
    comments?: IComment[];
    _count?: {
        comments: number;
    };
    createdAt: string;
    updatedAt: string;
};

type User = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: "ACTIVE" | "BLOCKED";
      role: "ADMIN" | "AUTHOR" | "USER";
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

export type UserProps = {
  user: User | null;
};
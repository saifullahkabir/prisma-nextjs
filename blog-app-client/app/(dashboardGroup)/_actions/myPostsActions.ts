"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type PostState<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export const createPost = async <T>(
  prevState: PostState<T>,
  formData: FormData,
) => {
  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  };

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User not logged in!");
    return null;
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    method: "POST",
    headers: {
      // Authorization : accessToken as unknown as string,
      // Authorization : `${accessToken}`,
      // Authorization : `Bearer ${accessToken}`,

      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }

  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }

  return result;
};

export const updatePost = async <T>(
  postId: string,
  prevState: PostState<T>,
  formData: FormData,
) => {

  console.log(postId);
  const payload = {
    title: formData.get("title") ?? "",
    content: formData.get("content") ?? "",
    thumbnail: formData.get("thumbnail") ?? "",
    tags: (formData.get("tags") as string).split(", ") ?? "",
    isPremium: formData.get("isPremium") === "on",
  };

  console.log(payload);

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User not logged in!");
    return null;
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts/${postId}`,
    {
      method: "PATCH",
      headers: {
        // Authorization : accessToken as unknown as string,
        // Authorization : `${accessToken}`,
        // Authorization : `Bearer ${accessToken}`,

        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }

  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }

  return result;
};

export const getMyPosts = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User not logged in!");
    return null;
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
    headers: {
      // Authorization : accessToken as unknown as string,
      // Authorization : `${accessToken}`,
      // Authorization : `Bearer ${accessToken}`,

      Cookie: `accessToken=${accessToken}`,
    },

    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 6, //* 6 hour
      tags: ["my-posts"],
    },
  });

  const result = await res.json();

  return result;
};

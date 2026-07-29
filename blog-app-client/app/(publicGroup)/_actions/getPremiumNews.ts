"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  //* bad approach
  // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`;

  //* good apporach
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }


  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User not logged in!");
    return null;
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/premium?${params.toString()}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },

      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 1,
        tags: ["premium-posts"],
      },
    },
  );

  const result = await res.json();

  return result;
};

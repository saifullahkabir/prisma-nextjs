import { cookies } from "next/headers";

export const getPremiumNews = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User not logged in!");
    return null;
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },

    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 1,
      tags: ["premium-posts"],
    },
  });

  const result = await res.json();

  return result;
};

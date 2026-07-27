"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const subscribePremium = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User not logged in!");
    return null;
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/subscription/checkout`,
    {
      method: "POST",
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

  if (result.success && result.data.paymentUrl) {
    redirect(result.data.paymentUrl);
  }

  return result;
};

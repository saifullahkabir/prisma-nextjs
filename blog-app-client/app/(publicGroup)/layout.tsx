import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";
import React from "react";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
}

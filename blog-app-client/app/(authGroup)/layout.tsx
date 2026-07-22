import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}

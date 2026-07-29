// import Navbar from "@/components/shared/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { getMe } from "@/service/getMe";

import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getMe();
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar user={user} /> */}
      <SidebarProvider className="flex-1">
        <DashboardSidebar />

        <main className="flex-1 min-w-0">{children}</main>
      </SidebarProvider>
    </div>
  );
}

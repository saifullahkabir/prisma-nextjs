"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Newspaper, Podcast } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "My Posts",
    href: "/dashboard/my-posts",
    icon: Podcast,
  },
  {
    label: "My Profile",
    href: "/dashboard/my-profile",
    icon: Podcast,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="none"
      className=" h-[calc(100svh-0rem)] border-r border-sidebar-border"
    >
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Newspaper className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <Link href={"/dashboard"}>
              <span className="text-sm text-sidebar-foreground/70">
                Dashboard
              </span>
            </Link>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu >
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton className="text-base" asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

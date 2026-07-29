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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem, sidebarMenuItems } from "../_config/sidebarMenuItems";
import BlogLogo from "@/components/ui/blog-logo";
import { UserProps } from "@/lib/types";

// const navItems = [
//   {
//     label: "My Posts",
//     href: "/dashboard/my-posts",
//     icon: Podcast,
//   },
//   {
//     label: "My Profile",
//     href: "/dashboard/my-profile",
//     icon: Podcast,
//   },
// ];

export default function DashboardSidebar({ user }: UserProps) {
  const pathname = usePathname();

  let navItems: SidebarItem[] = [];

  if (user?.data.profile.role === "USER") {
    navItems = sidebarMenuItems.USER;
  } else if (user?.data.profile.role === "AUTHOR") {
    navItems = sidebarMenuItems.AUTHOR;
  } else if (user?.data.profile.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="none"
      className=" h-[calc(100svh-0rem)] border-r border-sidebar-border"
    >
      <SidebarHeader className="flex items-center">
        {/* <div>
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
        </div> */}
        <BlogLogo />
      </SidebarHeader>

      <SidebarContent className="pt-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className="text-base"
                    asChild
                    isActive={pathname === item.href}
                  >
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

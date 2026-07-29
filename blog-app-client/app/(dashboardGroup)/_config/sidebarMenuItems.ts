import { FileText, LayoutDashboard, LucideProps, User } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type SidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const USER_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/dashboard/my-posts",
    icon: FileText,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];
const AUTHOR_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/author-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/author-dashboard",
    icon: FileText,
  },
  {
    label: "My Profile",
    href: "/author-dashboard/profile",
    icon: User,
  },
];
const ADMIN_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/admin-dashboard",
    icon: FileText,
  },
  {
    label: "My Profile",
    href: "/admin-dashboard/profile",
    icon: User,
  },
];

export const sidebarMenuItems = {
  USER: USER_SIDEBAR_ITEMS,
  AUTHOR: AUTHOR_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};

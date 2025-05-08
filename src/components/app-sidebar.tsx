/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { IconDatabase } from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logoImage from "../assets/image/logo.png";

import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/auth/authSlice";
import { TUser } from "@/types/type";
import { verifyToken } from "@/utils/verifyToken";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const token = useAppSelector(useCurrentToken);
  let user: TUser | null = null;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const navMain: any[] = [];
  const navSecondary: any[] = [];

  const adminDocuments = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDatabase,
    },
    {
      name: "Create Category",
      url: "/admin/create-category",
      icon: IconDatabase,
    },
    {
      name: "All Category",
      url: "/admin/data-category",
      icon: IconDatabase,
    },
    {
      name: "Create Book",
      url: "/admin/create-book",
      icon: IconDatabase,
    },
    {
      name: "All Books",
      url: "/admin/get-AllbooksData",
      icon: IconDatabase,
    },
  ];

  const userDocuments = [
    {
      name: "All Order History",
      url: "/get-order-histry",
      icon: IconDatabase,
    },
    {
      name: "All User History",
      url: "/users",
      icon: IconDatabase,
    },
  ];

  const documents =
    user?.role === "admin"
      ? adminDocuments
      : user?.role === "user"
      ? userDocuments
      : [];

  const defaultUser = {
    name: user?.role || "Guest",
    email: user?.role || "guest@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <span className="text-base font-semibold">
                  <img className="w-[100px] ms-2" src={logoImage} alt="logo" />
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={defaultUser} />
      </SidebarFooter>
    </Sidebar>
  );
}

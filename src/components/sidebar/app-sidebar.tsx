"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

interface AppSidebarProps {
  name: string;
  email: string;
  avatar: string;
  fallback: string;
}

export function AppSidebar({ name, email, avatar, fallback }: AppSidebarProps) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <NavUser
          name={name}
          email={email}
          avatar={avatar}
          fallback={fallback}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}

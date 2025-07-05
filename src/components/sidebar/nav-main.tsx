"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, Package2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

const navList = [
  {
    groupTitle: "Menu",
    menu: [
      {
        title: "Inventories",
        url: "/inventory",
        icon: Package2,
      },
      {
        title: "Users",
        url: "/user",
        icon: CircleUser,
      },
    ],
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      {navList.map(({ groupTitle, menu }) => (
        <SidebarGroup key={groupTitle}>
          <SidebarGroupLabel>{groupTitle}</SidebarGroupLabel>
          <SidebarMenu>
            {menu.map(({ title, url, icon: Icon }) => {
              const isMenuActive = pathname === url;

              return (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton tooltip={title} asChild>
                    <Link
                      href={url}
                      className={cn(isMenuActive && "font-bold bg-zinc-100")}
                    >
                      {Icon && <Icon />}
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

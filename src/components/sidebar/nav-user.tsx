"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown, Lock, LogOut, UserCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChangePasswordDialog } from "@/components/user/change-password-dialog";

import { authService } from "@/lib/services/auth-service";
import { apiClient } from "@/lib/api-client";
import { getInitial, removeCookie } from "@/lib/utils";
import { config } from "@/lib/config";

export function NavUser() {
  const router = useRouter();

  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState<boolean>(false);

  const { data: user, isLoading } = useQuery({
    queryKey: authService.keys.checkToken,
    queryFn: () => apiClient.get(authService.endpoints.checkToken),
  });

  const id = user?.data?.result?.id;
  const name = user?.data?.result?.name;
  const email = user?.data?.result?.email;
  const avatar = user?.data?.result?.image || "";
  const fallback = getInitial(name);

  const onLogout = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    window.location.href = "/login";
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={`${config.IMAGE_BASE_URL}/${avatar}`}
                    alt={name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {fallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="mt-1 h-3 w-full" />
                    </>
                  ) : (
                    <>
                      <span className="truncate font-semibold">{name}</span>
                      <span className="truncate text-xs">{email}</span>
                    </>
                  )}
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={`${config.IMAGE_BASE_URL}/${avatar}`}
                      alt={name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push(`/user/${id}/edit?profile=true`)}
                >
                  <UserCircle />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setShowChangePasswordDialog(true)}
                >
                  <Lock />
                  Change Password
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 cursor-pointer"
                onClick={onLogout}
              >
                <LogOut className="text-red-500" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      {showChangePasswordDialog && (
        <ChangePasswordDialog
          id={id}
          isOpen={showChangePasswordDialog}
          setOpen={setShowChangePasswordDialog}
        />
      )}
    </>
  );
}

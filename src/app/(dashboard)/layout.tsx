import React from "react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const name = "John Doe";
  const email = "8x2dF@example.com";
  const avatar = "https://github.com/vercel.png";
  const fallback = "JD";

  return (
    <SidebarProvider>
      <AppSidebar
        name={name}
        email={email}
        avatar={avatar}
        fallback={fallback}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

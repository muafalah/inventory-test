import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

export async function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}

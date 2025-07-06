import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";
import { TableUser } from "@/components/user/table";

export const metadata = {
  title: "List User | Inventory-Test",
};

const breadcrumb = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Users",
  },
];

export default function UserPage() {
  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <TableUser />
    </PageWrapper>
  );
}

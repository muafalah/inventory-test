import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";
import { FormUser } from "@/components/user/form";

export const metadata = {
  title: "Create User | Inventory-Test",
};

const breadcrumb = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Users",
    href: "/user",
  },
  {
    label: "Create User",
  },
];

export default function CreatePage() {
  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <FormUser />
    </PageWrapper>
  );
}

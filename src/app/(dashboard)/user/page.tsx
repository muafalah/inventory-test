import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";

export const metadata = {
  title: "Users | Inventory-Test",
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
];

export default function UserPage() {
  return <PageWrapper breadcrumb={breadcrumb}>UserPage</PageWrapper>;
}

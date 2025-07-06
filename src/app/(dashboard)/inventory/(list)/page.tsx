import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";

import { TableInventory } from "@/components/inventory/table";

export const metadata = {
  title: "List Inventory | Inventory-Test",
};

const breadcrumb = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Inventories",
  },
];

export default function ListPage() {
  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <TableInventory />
    </PageWrapper>
  );
}

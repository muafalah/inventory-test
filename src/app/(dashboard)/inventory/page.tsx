import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";

export const metadata = {
  title: "Inventory | Inventory-Test",
};

const breadcrumb = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Inventories",
    href: "/inventory",
  },
];

export default function InventoryPage() {
  return <PageWrapper breadcrumb={breadcrumb}>InventoryPage</PageWrapper>;
}

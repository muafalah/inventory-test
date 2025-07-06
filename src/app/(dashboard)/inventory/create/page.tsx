import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";

import { FormInventory } from "@/components/inventory/form";

export const metadata = {
  title: "Create Inventory | Inventory-Test",
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
  {
    label: "Create Inventory",
  },
];

export default function CreatePage() {
  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <FormInventory />
    </PageWrapper>
  );
}

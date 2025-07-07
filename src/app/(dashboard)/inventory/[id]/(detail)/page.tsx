import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";

import { FormInventory } from "@/components/inventory/form";

export const metadata = {
  title: "Detail Inventory | Inventory-Test",
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
    label: "Detail Inventory",
  },
];

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <FormInventory id={id} disabled />
    </PageWrapper>
  );
}

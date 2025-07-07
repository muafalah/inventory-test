import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";

import { FormInventory } from "@/components/inventory/form";

export const metadata = {
  title: "Edit Inventory | Inventory-Test",
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
    label: "Edit Inventory",
  },
];

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <FormInventory id={id} />
    </PageWrapper>
  );
}

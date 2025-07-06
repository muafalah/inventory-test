import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";
import { FormUser } from "@/components/user/form";

export const metadata = {
  title: "Detail User | Inventory-Test",
};

const breadcrumb = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Users",
    href: "/User",
  },
  {
    label: "Detail User",
  },
];

export default async function DetailPage({
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  params = await params;
  const { id } = params;

  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <FormUser id={id} disabled />
    </PageWrapper>
  );
}

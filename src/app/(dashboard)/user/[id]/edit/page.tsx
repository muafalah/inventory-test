import React from "react";

import { PageWrapper } from "@/components/sidebar/page-wrapper";
import { FormUser } from "@/components/user/form";

export const metadata = {
  title: "Edit User | User-Test",
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
    label: "Edit User",
  },
];

export default async function EditPage({
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  params = await params;
  const { id } = params;

  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <FormUser id={id} />
    </PageWrapper>
  );
}

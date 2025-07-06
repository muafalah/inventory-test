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
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  params = await params;
  searchParams = await searchParams;
  const { id } = params;
  const { profile } = searchParams;

  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <FormUser id={id} isProfile={!!profile} />
    </PageWrapper>
  );
}

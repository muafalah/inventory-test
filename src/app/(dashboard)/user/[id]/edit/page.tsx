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
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ profile: string }>;
}) {
  const { id } = await params;
  const { profile } = await searchParams;

  return (
    <PageWrapper breadcrumb={breadcrumb}>
      <FormUser id={id} isProfile={!!profile} />
    </PageWrapper>
  );
}

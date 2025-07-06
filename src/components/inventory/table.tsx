"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { PlusCircle, Search } from "lucide-react";
import { debounce } from "lodash";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/datatable";

import { apiClient } from "@/lib/api-client";
import { inventoryService } from "@/lib/services/inventory-service";

import { columns } from "./columns";

export const TableInventory = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 1000),
    []
  );

  const params = {
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    sortBy: {
      field: sorting[0].id,
      order: sorting[0].desc ? "desc" : "asc",
    },
    search,
  };

  const { data: inventories, isFetching } = useQuery({
    queryKey: [...inventoryService.keys.list, params],
    queryFn: () =>
      apiClient.get(inventoryService.endpoints.list, {
        params,
      }),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Input
            className="max-w-xs"
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Search name..."
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/inventory/create")}
        >
          <PlusCircle /> Add Inventory
        </Button>
      </div>

      <div>
        <DataTable
          isLoading={isFetching}
          data={inventories?.data?.result || []}
          columns={columns}
          totalData={inventories?.data?.meta?.totalItems || 0}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
    </div>
  );
};

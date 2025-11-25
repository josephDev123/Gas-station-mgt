import { Button } from "@/components/ui/button";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { lazy, Suspense, useState } from "react";
import { pumpColumnDef } from "./columnDefs/pumpColumnDef";
import { useQueryFacade } from "@/hooks/useFetch";
import { IPump } from "./type/IPump";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/commons/Pagination";
import { LoaderCircle } from "lucide-react";

const ConfigurePumpModal = lazy(() => import("./components/ConfigurePump"));

const fallbackData = [];

export default function page() {
  const [isCreatePumpModalOpen, setIsCreatePumpModalOpen] = useState(false);
  const [globalFilter, setGlobal] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const { isLoading, isError, error, data } = useQueryFacade<
    IPump[],
    Error,
    string | object | number,
    { PumpQueryPaginate: IPump[]; totalCount: number; page: number }
  >(["pump", { page }], `pump/find?page=${page}&limit=${limit}`);

  const totalPages = data?.PumpQueryPaginate
    ? Math.ceil(data.totalCount / limit)
    : 0;

  const decrementDisabled = page <= 1;
  const incrementDisabled = page >= totalPages;

  const table = useReactTable({
    columns: pumpColumnDef,
    data: data?.PumpQueryPaginate ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobal,
  });
  return (
    <main className="flex flex-col">
      <section className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Pump Configuration</h1>
        <p className="text-gray-600 text-sm">
          Configure pump details for the fuel depot system, including creating,
          updating, and removing pump records.
        </p>
      </section>

      <section className="flex justify-between items-center mt-4">
        <input
          type="search"
          name=""
          id=""
          className="p-2 rounded-md border shadow-sm"
          placeholder="Search"
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
        />
        <Button
          onClick={() => setIsCreatePumpModalOpen(true)}
          variant="default"
          className="px-4 py-2 rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
        >
          Add
        </Button>
      </section>

      <section className="overflow-x-auto max-w-full mt-5 bg-white rounded-lg p-4">
        {isLoading ? (
          <div className="flex flex-col h-52 justify-center items-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex flex-col text-red-300 h-52 justify-center items-center">
            {error.message}
          </div>
        ) : (
          <>
            {data?.PumpQueryPaginate?.length === 0 ? (
              <div className="flex flex-col h-52 justify-center items-center">
                No Pump records found.
              </div>
            ) : (
              <table className="min-w-full border-collapse  border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="border border-gray-300 px-4 py-2 text-left text-nowrap"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="border-b border-gray-300 px-4 py-2"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

                <Pagination
                  decrementDisabled={decrementDisabled}
                  incrementDisabled={incrementDisabled}
                  limit={limit}
                  page={page}
                  totalPages={totalPages}
                  setSearchParams={setSearchParams}
                />
              </table>
            )}
          </>
        )}
      </section>

      <Suspense>
        <ConfigurePumpModal
          open={isCreatePumpModalOpen}
          onOpenChange={setIsCreatePumpModalOpen}
        />
      </Suspense>
    </main>
  );
}

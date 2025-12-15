import Pagination from "@/components/commons/Pagination";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQueryFacade } from "@/hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateNozzle from "./components/CreateNozzle";
import { Nozzle } from "./types/INozzle";
import { NozzleColumnDef } from "./columnDef/NozzleColumnDef";

const fallbackData = [];

export default function NozzlePage() {
  const [isCreateNozzleOpen, SetIsCreateNozzleOpen] = useState(false);
  const [globalFilter, setGlobal] = useState<any[]>([]);
  const [searchGlobalFilter, setSearchGlobal] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const { isLoading, isError, error, data } = useQueryFacade<
    Nozzle[],
    Error,
    string | object | number,
    { nozzles: Nozzle[]; totalCount: number; page: number }
  >(["pumpToNozzles", { page }], `nozzle/?page=${page}&limit=${limit}`);

  console.log(data);

  const totalPages = data?.nozzles ? Math.ceil(data.totalCount / limit) : 0;

  const decrementDisabled = page <= 1;
  const incrementDisabled = page >= totalPages;

  const table = useReactTable({
    columns: NozzleColumnDef,
    data: data?.nozzles ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobal,
  });

  return (
    <main className="flex flex-col w-full h-full">
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Nozzle</h1>
        <p className="text-gray-600 text-sm">
          This page create nozzle, assign nozzle to pump, and displays assigned
          nozzle to Pump.
        </p>
      </section>
      <section className="flex flex-col  space-y-2">
        <div className="flex items-center justify-between">
          <input
            type="search"
            name=""
            placeholder="Search"
            //   onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className="p-2 rounded-md border max-w-80 my-4"
          />

          <Button
            onClick={() => SetIsCreateNozzleOpen(true)}
            variant="default"
            className="px-4 py-2 rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
          >
            Create Nozzle
          </Button>
        </div>

        <section className="overflow-x-auto max-w-full  bg-white rounded-lg p-4">
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
              {data?.nozzles?.length === 0 ? (
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
      </section>

      <CreateNozzle
        open={isCreateNozzleOpen}
        onOpenChange={SetIsCreateNozzleOpen}
      />
    </main>
  );
}

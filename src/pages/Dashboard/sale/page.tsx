import { useQueryFacade } from "@/hooks/useFetch";
import CreateSales from "./components/CreateSales";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ISale } from "./types/ISale";
import Pagination from "@/components/commons/Pagination";
import { LoaderCircle } from "lucide-react";
import { salesColumndef } from "./columndef/SalesColumndef";

const fallbackData = [];

export default function SalePage() {
  const [isCreateNozzleOpen, SetIsCreateNozzleOpen] = useState(false);
  const [globalFilter, setGlobal] = useState<any[]>([]);
  const [searchGlobalFilter, setSearchGlobal] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");
  const { isLoading, isError, error, data } = useQueryFacade<
    ISale[],
    Error,
    string | object | number,
    { SalesQuery: ISale[]; totalCount: number; page: number }
  >(["sales"], `sales/find`);
  console.log("Sales Data:", data);

  const totalPages = data?.SalesQuery ? Math.ceil(data.totalCount / limit) : 0;

  const decrementDisabled = page <= 1;
  const incrementDisabled = page >= totalPages;

  const table = useReactTable({
    columns: salesColumndef,
    data: data?.SalesQuery ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobal,
  });
  return (
    <main className="flex flex-col w-full h-full">
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Fuel Sales Records</h1>
        <p className="text-gray-600 text-sm">
          View and track all fuel sales transactions, including pump and nozzle
          details, fuel type, price per liter, volume sold, total amount, and
          the attendant responsible for each sale.
        </p>
      </section>
      <CreateSales />

      <section className="overflow-x-auto max-w-full  bg-white rounded-lg sm:p-4 p-2 mt-6">
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
            {data?.SalesQuery?.length === 0 ? (
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
    </main>
  );
}

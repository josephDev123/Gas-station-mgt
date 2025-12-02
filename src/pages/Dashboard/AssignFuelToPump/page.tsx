import Pagination from "@/components/commons/Pagination";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQueryFacade } from "@/hooks/useFetch";
import { IPump } from "../pump/type/IPump";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { pumpFColumnDef } from "./columnDefs/pumpColumnDef";

const fallbackData = [];

export default function FuelToPumpPage() {
  const [globalFilter, setGlobal] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const { isLoading, isError, error, data } = useQueryFacade<
    IPump[],
    Error,
    string | object | number,
    { PumpQueryPaginate: IPump[]; totalCount: number; page: number }
  >(["fuelPump", { page }], `pump/find?page=${page}&limit=${limit}`);

  const totalPages = data?.PumpQueryPaginate
    ? Math.ceil(data.totalCount / limit)
    : 0;

  const decrementDisabled = page <= 1;
  const incrementDisabled = page >= totalPages;

  const table = useReactTable({
    columns: pumpFColumnDef,
    data: data?.PumpQueryPaginate ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobal,
  });
  return (
    <main className="flex flex-col w-full h-full">
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Assign Fuel to Pump</h1>
        <p className="text-gray-600 text-sm">
          This page allows you to assign specific fuel types (e.g., Diesel,
          Petrol, Kerosene) to individual pumps at the fuel station, ensuring
          the correct fuel is dispensed from each pump.
        </p>
      </section>
      <section className="flex flex-col  space-y-2">
        <input
          type="search"
          name=""
          placeholder="Search"
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="p-2 rounded-md border max-w-80 my-4"
        />
        <h3 className="font-semibold mt-6">Assign Fuel to Pump 👇</h3>
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
      </section>
      <hr className="mt-4" />
      <section className="flex flex-col  space-y-2">
        <input
          type="search"
          name=""
          placeholder="Search"
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className="p-2 rounded-md border max-w-80 my-4"
        />
        <h3 className="font-semibold mt-6">Assignment list 👇</h3>
      </section>
    </main>
  );
}

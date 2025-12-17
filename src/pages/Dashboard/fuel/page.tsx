import { useQueryFacade } from "@/hooks/useFetch";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fuelColumnDef } from "./columnDefs/fuelColumn";
import { IFuel } from "./type/IFuel";
import { LoaderCircle } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdExpandLess } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { url } from "node:inspector/promises";
import Pagination from "@/components/commons/Pagination";

const CreateFuelModal = lazy(() => import("./components.tsx/CreateFuelModal"));

const fallbackData = [];

export default function page() {
  const [isCreateFuelModalOpen, setIsCreateFuelModalOpen] = useState(false);
  const [globalFilter, setGlobal] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const { isLoading, isError, error, data } = useQueryFacade<
    IFuel[],
    Error,
    string | object | number,
    { fuels: IFuel[]; totalCount: number; page: number }
  >(["fuel", { page }], `fuel/find?page=${page}&limit=${limit}`);

  const totalPages = data?.fuels ? Math.ceil(data.totalCount / limit) : 0;

  const decrementDisabled = page <= 1;
  const incrementDisabled = page >= totalPages;

  const table = useReactTable({
    columns: fuelColumnDef,
    data: data?.fuels ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobal,
  });

  return (
    <main className="flex flex-col">
      <section className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Fuel Management</h1>
        <p className="text-gray-600 text-sm">
          Monitor and manage all fuel records, including fuel type, volume
          levels, and pricing details.
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
          onClick={() => setIsCreateFuelModalOpen(true)}
          variant="default"
          className="px-4 py-2 rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
        >
          Add
        </Button>
      </section>

      <section className="overflow-x-auto max-w-full mt-5 bg-white rounded-lg">
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
            {data?.fuels?.length === 0 ? (
              <div className="flex flex-col h-52 justify-center items-center">
                No Fuel records found.
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
        <CreateFuelModal
          open={isCreateFuelModalOpen}
          onOpenChange={setIsCreateFuelModalOpen}
        />
      </Suspense>
    </main>
  );
}

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
import AssignNozzleToUser from "./components/AssignNozzleToUser";
import { NozzleToUser } from "./types/INozzleToUser";
import { NozzleToUserDef } from "./columndef/NozzleToUserDef";

const fallbackData = [];

export default function NozzleToUserPage() {
  const [isCreateNozzleOpen, SetIsCreateNozzleOpen] = useState(false);
  const [globalFilter, setGlobal] = useState<any[]>([]);
  const [searchGlobalFilter, setSearchGlobal] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const { isLoading, isError, error, data } = useQueryFacade<
    NozzleToUser[],
    Error,
    string | object | number,
    { NozzleToUser: NozzleToUser[]; totalCount: number; page: number }
  >(["nozzleToUser", { page }], `nozzle-to-user/?page=${page}&limit=${limit}`);

  console.log(data);

  const totalPages = data?.NozzleToUser
    ? Math.ceil(data.totalCount / limit)
    : 0;

  const decrementDisabled = page <= 1;
  const incrementDisabled = page >= totalPages;

  const table = useReactTable({
    columns: NozzleToUserDef,
    data: data?.NozzleToUser ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobal,
  });

  return (
    <main className="flex flex-col w-full h-full">
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Nozzle to User</h1>
        <p className="text-gray-600 text-sm">
          This page assign nozzle to User, and displays assigned nozzle to User.
        </p>
      </section>
      <section className="flex flex-col  space-y-5">
        <AssignNozzleToUser />

        <section className="overflow-x-auto max-w-full  bg-white rounded-lg sm:p-4 p-2 ">
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
              {data?.NozzleToUser?.length === 0 ? (
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

      {/* <CreateNozzle
        open={isCreateNozzleOpen}
        onOpenChange={SetIsCreateNozzleOpen}
      /> */}
    </main>
  );
}

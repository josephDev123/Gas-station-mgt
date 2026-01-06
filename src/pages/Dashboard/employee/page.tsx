import { useQueryFacade } from "@/hooks/useFetch";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSearchParams } from "react-router-dom";
import { IUser, IUsersData } from "./types/User";
import { useState } from "react";
import { usersColumnDef } from "./columnDef/UsersColumnDef";
import { LoaderCircle } from "lucide-react";
import Pagination from "@/components/commons/Pagination";

const fallbackData = [];

export default function Staff() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [globalFilter, setGlobal] = useState<any[]>([]);

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const { isLoading, isError, error, data } = useQueryFacade<
    IUsersData,
    Error,
    string | object | number
  >(["staffs"], `auth/users?page=${page}&limit=${limit}`);

  // console.log("Employee Data:", data);

  const totalPages = data?.Users ? Math.ceil(data.totalCount / limit) : 0;

  const decrementDisabled = page <= 1;
  const incrementDisabled = page >= totalPages;

  const table = useReactTable({
    columns: usersColumnDef,
    data: data?.Users ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobal,
  });
  return (
    <main className="flex flex-col">
      <section className="flex flex-col">
        <h1 className="text-xl font-bold">Staff Management</h1>
        <p className="text-gray-700 text-sm">
          Manage attendants, supervisors, and administrators with role-based
          access.
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
      </section>

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
            {data?.Users?.length === 0 ? (
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

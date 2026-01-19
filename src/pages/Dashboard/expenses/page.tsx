import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CreateExpenseSection from "./components/CreateExpenseSection";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryFacade } from "@/hooks/useFetch";
import { LoaderCircle } from "lucide-react";
import Pagination from "@/components/commons/Pagination";
import { expenseColumns } from "./columnDef/expensesColumnDef";
import {
  Expense,
  ExpenseData,
  GetExpensesResponse,
} from "./types/apiGetExpenseResult";

const fallbackData = [];

export default function page() {
  const [isCreateNozzleOpen, SetIsCreateNozzleOpen] = useState(false);
  const [globalFilter, setGlobal] = useState<any[]>([]);
  const [searchGlobalFilter, setSearchGlobal] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const { isLoading, isError, error, data } = useQueryFacade<
    ExpenseData[],
    Error,
    string | object | number,
    ExpenseData
  >(["expenses", { page }], `expenses/find/?page=${page}&limit=${limit}`);

  console.log(data);

  const totalPages = data?.totalCount ? Math.ceil(data?.totalCount / limit) : 0;

  const decrementDisabled = page <= 1;
  const incrementDisabled = page >= totalPages;

  const table = useReactTable({
    columns: expenseColumns,
    data: data?.expenses ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobal,
  });

  return (
    <main className="flex flex-col w-full h-full">
      <section className="flex flex-col space-y-3">
        <h1 className="text-2xl font-bold">Station Expenses</h1>
        <p className="text-gray-600 text-sm">
          Record and monitor all operational expenses incurred at the station,
          including fuel purchases, maintenance costs, utilities, logistics, and
          other day-to-day spending to maintain accurate financial records.
        </p>
      </section>
      <section className="flex flex-col">
        <CreateExpenseSection />
      </section>

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
            {data?.expenses?.length === 0 ? (
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
                                header.getContext(),
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
                            cell.getContext(),
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

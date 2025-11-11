import { useQueryFacade } from "@/hooks/useFetch";
import { motion } from "motion/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fuelColumnDef } from "./columnDefs/fuelColumn";
import { IFuel } from "./type/IFuel";
import { LoaderCircle } from "lucide-react";
import { CreateFuelModal } from "./components.tsx/CreateFuelModal";

const fallbackData = [];

export default function page() {
  const { isLoading, isError, error, data } = useQueryFacade<
    IFuel[],
    Error,
    string,
    IFuel[]
  >(["fuel"], "fuel/find");
  // console.log(data);

  const table = useReactTable({
    columns: fuelColumnDef,
    data: data ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <main className="flex flex-col p-4">
      <section className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Fuel Management</h1>
        <p className="text-gray-600 text-sm">
          Monitor and manage all fuel records, including fuel type, volume
          levels, and pricing details.
        </p>
      </section>
      <section className="flex justify-end">
        {/* <motion.button
          // onClick={() => setOpen(true)}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
        >
          Add
        </motion.button> */}
        <CreateFuelModal />
      </section>

      <section className="overflow-x-auto mt-5 bg-white rounded-lg p-4">
        {isLoading ? (
          <div className="flex flex-col h-52 justify-center items-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex flex-col text-red-300 h-52 justify-center items-center">
            {error.message}
          </div>
        ) : (
          <table className="min-w-full border-collapse  border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-300 px-4 py-2 text-left"
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
          </table>
        )}
      </section>
    </main>
  );
}

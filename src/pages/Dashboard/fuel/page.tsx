import { useQueryFacade } from "@/hooks/useFetch";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { fuelColumnDef } from "./columnDefs/fuelColumn";
import { IFuel } from "./type/IFuel";

export default function page() {
  const { isLoading, isError, error, data } = useQueryFacade<
    IFuel[],
    Error,
    string,
    IFuel[]
  >(["fuel"], "fuel/find");

  const table = useReactTable({
    columns: fuelColumnDef,
    data: data,
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
    </main>
  );
}

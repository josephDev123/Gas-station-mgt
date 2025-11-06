import { useQueryFacade } from "@/hooks/useFetch";
import { useReactTable } from "@tanstack/react-table";

export default function EmployeePage() {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col">
        <h1 className="text-xl font-bold">Employee</h1>
        <p className="text-gray-700 text-sm">
          Team members dedicated to excellence and collaboration.
        </p>
      </section>

      <section className="flex flex-col"></section>
    </main>
  );
}

import { useQueryFacade } from "@/hooks/useFetch";
import { useReactTable } from "@tanstack/react-table";

export default function Staff() {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col">
        <h1 className="text-xl font-bold">Staff Management</h1>
        <p className="text-gray-700 text-sm">
          Manage attendants, supervisors, and administrators with role-based
          access and activity tracking.
        </p>
      </section>

      <section className="flex flex-col"></section>
    </main>
  );
}

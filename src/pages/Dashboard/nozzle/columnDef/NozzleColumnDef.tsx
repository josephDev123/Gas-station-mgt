import { ColumnDef } from "@tanstack/react-table";
import { Nozzle } from "../types/INozzle";
import DeleteEditActionBtn from "../components/DeleteEditBtn";

export const NozzleColumnDef: ColumnDef<Nozzle>[] = [
  {
    header: "S/N",
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  {
    header: "Nozzle Name",
    cell: ({ row }) => row.original.name,
  },

  {
    header: "Nozzle Status",
    cell: ({ row }) => row.original.status,
  },

  {
    header: "Assigned Pump Name",
    cell: ({ row }) => row.original.pump?.name ?? "N/A",
  },

  {
    header: "Assigned Pump status",
    cell: ({ row }) => row.original.pump?.status ?? "N/A",
  },

  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = !row.original.pump
        ? "N/A"
        : new Date(row.original.pump?.createdAt).toLocaleDateString("en-US");
      return date;
    },
  },

  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = !row.original.pump
        ? "N/A"
        : new Date(row.original.pump?.updatedAt).toLocaleDateString("en-US");
      return date;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => <DeleteEditActionBtn row={row} />,
  },
];

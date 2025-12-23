import { ColumnDef } from "@tanstack/react-table";
import { NozzleToUser } from "../types/INozzleToUser";
import DeleteEditBtn from "../components/DeleteEditBtn";

export const NozzleToUserDef: ColumnDef<NozzleToUser>[] = [
  {
    header: "S/N",
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  {
    header: "Nozzle Name",
    cell: ({ row }) => row.original.nozzle?.name ?? "N/A",
  },
  {
    header: "Nozzle Status",
    cell: ({ row }) => row.original.nozzle?.status ?? "N/A",
  },
  {
    header: "User Name",
    cell: ({ row }) => row.original.user?.name ?? "N/A",
  },
  {
    header: "User Email",
    cell: ({ row }) => row.original.user?.email ?? "N/A",
  },
  {
    header: "User role",
    cell: ({ row }) => row.original.user?.role ?? "N/A",
  },
  {
    header: "Actions",
    cell: ({ row }) => <DeleteEditBtn row={row} />,
  },
];

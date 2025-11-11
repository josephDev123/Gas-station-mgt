import { ColumnDef } from "@tanstack/react-table";
import { IFuel } from "../type/IFuel";
import DeleteEditActionBtn from "../components.tsx/DeleteEditActionBtn";

export const fuelColumnDef: ColumnDef<IFuel>[] = [
  {
    header: "S/N",
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  {
    header: "Fuel name",
    accessorKey: "name",
  },
  {
    header: "Fuel Type",
    accessorKey: "fuelType",
  },

  {
    header: "Fuel Volumn",
    accessorKey: "fuelVolume",
  },

  {
    header: "Unit",
    accessorKey: "unit",
  },

  {
    header: "Price per liter",
    accessorKey: "price_per",
  },

  {
    header: "Created At",
    accessorKey: "createdAt",
  },

  {
    header: "Action",
    cell: ({ row }) => <DeleteEditActionBtn row={row} />,
  },
];

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
    cell: ({ row }) => {
      const name = row?.original?.name ?? "N/A";
      return <div className="min-w-44">{name}</div>;
    },
  },
  {
    header: "Fuel Type",
    accessorKey: "fuelType",
  },

  {
    header: "Fuel Volume",
    accessorKey: "fuelVolume",
  },

  {
    header: "Fuel Volume Left",
    accessorKey: "volumeLeft",
    cell: ({ row }) => {
      return row?.original?.volumeLeft ?? "N/A";
    },
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
    cell: ({ row }) => {
      const date = new Date(row?.original?.createdAt ?? null);
      if (isNaN(date.getTime())) return ""; // handle invalid/null date

      const dateTime = date.toLocaleString(); // shows date + time based on user locale
      return <div className="min-w-44">{dateTime}</div>;
    },
  },

  {
    header: "Action",
    cell: ({ row }) => <DeleteEditActionBtn row={row} />,
  },
];

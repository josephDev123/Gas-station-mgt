import { ColumnDef } from "@tanstack/react-table";
import { PumpFuelItem } from "../type/IFuelPump";

export const FuelPumpColumnDef: ColumnDef<PumpFuelItem>[] = [
  {
    header: "S/N",
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  {
    header: "Fuel Assigned to Pump",
    cell: ({ row }) => row?.original?.volume,
  },

  {
    header: "Pump name",
    cell: ({ row }) => row?.original?.pump?.name,
  },

  {
    header: "Pump Status",
    cell: ({ row }) => row?.original?.pump?.status,
  },

  {
    header: "Fuel Name",
    cell: ({ row }) => row?.original?.fuel?.name,
  },

  {
    header: "Fuel Type",
    cell: ({ row }) => row?.original?.fuel?.fuelType,
  },
  {
    header: "Fuel volume ",
    cell: ({ row }) => row?.original?.fuel?.fuelVolume,
  },

  {
    header: "Fuel volume Left",
    cell: ({ row }) => row?.original?.fuel?.volumeLeft || "N/A",
  },

  {
    header: "Fuel Unit",
    cell: ({ row }) => row?.original?.fuel?.unit,
  },

  {
    header: "Fuel Per Price",
    cell: ({ row }) => row?.original?.fuel?.price_per,
  },

  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("en-US");
    },
  },

  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("en-US");
    },
  },
];

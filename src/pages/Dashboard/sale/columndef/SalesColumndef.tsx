import { ColumnDef } from "@tanstack/react-table";
import { ISale } from "../types/ISale";
import DeleteEditActionBtn from "../components/EditDeleteBtn";

export const salesColumndef: ColumnDef<ISale>[] = [
  {
    header: "S/N",
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },
  {
    header: "sold by",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.User?.name ?? "N/A"}
      </div>
    ),
  },

  {
    header: " User Role",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.User?.role ?? "N/A"}{" "}
      </div>
    ),
  },

  {
    header: "Price per liter",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.price_per ? "₦" : ""}{" "}
        {row?.original?.price_per ?? "N/A"}{" "}
      </div>
    ),
  },

  {
    header: "Liter sold",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.liter_sold ?? "N/A"}{" "}
      </div>
    ),
  },

  {
    header: "Total Price sold",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.total_price_calc ? "₦" : ""}{" "}
        {row?.original?.total_price_calc ?? "N/A"}{" "}
      </div>
    ),
  },

  {
    header: "Nozzle sold from",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.Nozzle?.name ?? "N/A"}{" "}
      </div>
    ),
  },

  {
    header: "Fuel type Sold",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.PumpFuel?.fuel?.fuelType ?? "N/A"}{" "}
      </div>
    ),
  },

  {
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.customerName ?? "N/A"}
      </div>
    ),
  },

  {
    header: "Fuel name Sold",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.PumpFuel?.fuel?.name ?? "N/A"}{" "}
      </div>
    ),
  },

  {
    header: "Pump name Sold from",
    cell: ({ row }) => (
      <div className="max-w-52 truncate capitalize">
        {row?.original?.PumpFuel?.pump?.name ?? "N/A"}{" "}
      </div>
    ),
  },

  {
    header: "Actions",
    cell: ({ row }) => <DeleteEditActionBtn row={row} />,
  },
];

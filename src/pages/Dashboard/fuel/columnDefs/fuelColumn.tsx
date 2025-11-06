import { ColumnDef } from "@tanstack/react-table";
import { IFuel } from "../type/IFuel";

export const fuelColumnDef: ColumnDef<IFuel>[] = [
  {
    header: "Fuel name",
    accessorKey: "name",
  },
  {
    header: "Fuel Type",
    accessorKey: "fuelType",
  },
];

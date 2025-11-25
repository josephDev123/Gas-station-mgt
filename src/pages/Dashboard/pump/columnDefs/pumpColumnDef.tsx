import { ColumnDef } from "@tanstack/react-table";
import { IPump } from "../type/IPump";
import DeleteEditActionBtn from "../../pump/components/EditDeleteBtn";

export const pumpColumnDef: ColumnDef<IPump>[] = [
  {
    header: "S/N",

    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },

  {
    header: "Pump Name",
    accessorKey: "name",
  },

  {
    header: "Status",
    accessorKey: "status",
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

  {
    header: "Action",
    cell: ({ row }) => <DeleteEditActionBtn row={row} />,
  },
];

import { ColumnDef } from "@tanstack/react-table";
import { Expense } from "../types/apiGetExpenseResult";
import DeleteEditViewBtn from "../components/DeleteEditViewBtn";
import { IUser } from "@/types/IUser";
import { Link } from "react-router-dom";

export function expenseColumns(session: IUser): ColumnDef<Expense>[] {
  const expenseColumns: ColumnDef<Expense>[] = [
    {
      header: "ID",
      cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
    },
    {
      header: "Description",
      cell: ({ row }) => <div>{row.original.description}</div>,
    },
    {
      header: "Category",
      cell: ({ row }) => <div>{row.original.category}</div>,
    },
    {
      header: "Amount (₦)",
      cell: ({ row }) => <div>{row.original.amount}</div>,
    },
    {
      header: "Receipt",
      cell: ({ row }) => (
        <>
          {!row.original.receiptUrl ? (
            "N/A"
          ) : (
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Link to={row.original.receiptUrl} target="_blank">
                <img
                  src={row.original.receiptUrl}
                  alt=""
                  className="object-fill"
                />
              </Link>
            </div>
          )}
        </>
      ),
    },

    ...(session.role === "ADMIN"
      ? [
          {
            header: "Action",
            cell: ({ row }) => <DeleteEditViewBtn row={row} />,
          },
        ]
      : []),
  ];
  return expenseColumns;
}

import { useMutateAction } from "@/hooks/useMutation";
import { Row } from "@tanstack/react-table";
import { lazy, Suspense, useState } from "react";

import { queryClient } from "@/App";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Expense } from "../types/apiGetExpenseResult";
import EditExpense from "./EditExpense";

const DeleteModal = lazy(() => import("../../../../components/DeleteModal"));
// const EditModal = lazy(() => import("./EditNozzle"));

export default function DeleteEditViewBtn({ row }: { row: Row<Expense> }) {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setEditOpen] = useState<boolean>(false);
  const [editRow, setEditRow] = useState<Row<Expense> | undefined>(undefined);

  const { mutate, isPending } = useMutateAction<
    { data: any; msg: string },
    null
  >("delete", `expenses/delete/${row?.original?.id}`);
  const handleDelete = () => {
    mutate(null, {
      onError: (error) => {
        const errMessage =
          typeof error?.message === "object" && error?.message !== null
            ? error?.message
            : "An error occurred";
        toast.error(errMessage);
        return;
      },
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["expenses"],
        });
        toast.success(data.msg);
        setTimeout(() => setOpen(false), 1000);
        return;
      },
    });
  };

  return (
    <>
      <div className="inline-flex gap-2 items-center">
        <Link
          to={row?.original?.receiptUrlMetadata?.secure_url}
          target="_blank"
          className="px-4 py-1 border shadow-sm rounded-lg bg-blue-500 "
        >
          View
        </Link>
        <button
          type="button"
          onClick={() => {
            setEditRow(row);
            setEditOpen(true);
          }}
          className="px-4 py-1 border shadow-sm rounded-lg border-green-300 "
        >
          Edit
        </button>
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="px-4 py-1 bg-red-500 rounded-lg text-white"
        >
          Delete
        </button>
      </div>

      <Suspense>
        <DeleteModal
          deleteStatus={isPending}
          action={handleDelete}
          heading="Delete Expense"
          desc="Are you sure you want to delete this item? 
          This action cannot be undone and will permanently
           remove the record from the system."
          open={open}
          setOpen={setOpen}
        />
      </Suspense>

      <Suspense>
        <EditExpense row={editRow} open={openEdit} setOpen={setEditOpen} />
      </Suspense>
    </>
  );
}

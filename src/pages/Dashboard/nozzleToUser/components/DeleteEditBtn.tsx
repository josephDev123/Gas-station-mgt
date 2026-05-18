import { useMutateAction } from "@/hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { lazy, Suspense, useState } from "react";
import { toast } from "sonner";

const DeleteModal = lazy(() => import("../../../../components/DeleteModal"));
const EditModal = lazy(() => import("./EditNozzleToUser"));

export default function DeleteEditBtn({ row }: { row: Row<any> }) {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setEditOpen] = useState<boolean>(false);
  const [editRow, setEditRow] = useState<Row<any> | undefined>(undefined);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutateAction<
    { data: any; msg: string },
    null
  >("delete", `nozzle-to-user/delete/${row?.original?.id}`);

  const handleDelete = () => {
    mutate(null, {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response.data?.message);
          return;
        }
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }

        toast.error("Something went wrong while deleting the assignment");
        return;
      },
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["nozzleToUser"],
        });

        setTimeout(() => setOpen(false), 2000);

        toast.success(data.msg || "Deleted successfully");
        return;
      },
    });
  };

  return (
    <>
      <div className="inline-flex gap-2 items-center">
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
          heading="Delete Nozzle Assignment"
          desc="Are you sure you want to delete this item? 
          This action cannot be undone and will permanently
           remove the record from the system."
          open={open}
          setOpen={setOpen}
        />
      </Suspense>

      <Suspense>
        <EditModal row={editRow} open={openEdit} setOpen={setEditOpen} />
      </Suspense>
    </>
  );
}

import { useMutateAction } from "@/hooks/useMutation";
import { Row } from "@tanstack/react-table";
import { lazy, Suspense, useState } from "react";

import { queryClient } from "@/App";
import { toast } from "sonner";
import { IPump } from "../../pump/type/IPump";

const DeleteModal = lazy(() => import("../../../../components/DeleteModal"));
const AssignFuelModal = lazy(() => import("./AssignFuelModal"));

export default function AssignFuelActionBtn({ row }: { row: Row<IPump> }) {
  const [open, setOpen] = useState<boolean>(false);
  const [editRow, setEditRow] = useState<Row<IPump> | undefined>(undefined);
  // const { mutate, isPending, data } = useMutateAction<
  //   { data: IPump; msg: string },
  //   null
  // >("delete", `pump/delete/${row?.original?.id}`);
  // const handleDelete = () => {
  //   mutate(null, {
  //     onError: (error) => {
  //       const errMessage =
  //         typeof error?.message === "object" && error?.message !== null
  //           ? error?.message
  //           : "An error occurred";
  //       toast.error(errMessage);
  //       return;
  //     },
  //     onSuccess: async (data) => {
  //       await queryClient.invalidateQueries({
  //         queryKey: ["pump"],
  //       });
  //       toast.success(data.msg);
  //       setTimeout(() => setOpen(false), 1000);
  //       return;
  //     },
  //   });
  // };
  return (
    <>
      <div className="inline-flex gap-2 items-center">
        <button
          type="button"
          onClick={() => {
            setEditRow(row);
            setOpen(true);
          }}
          className="px-4 py-1 border shadow-sm rounded-lg border-green-300 "
        >
          Assign Fuel
        </button>
      </div>

      <Suspense>
        <AssignFuelModal row={editRow} open={open} setOpen={setOpen} />
      </Suspense>
    </>
  );
}

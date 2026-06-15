import { useMutateAction } from "@/hooks/useMutation";
import { Row } from "@tanstack/react-table";
import { lazy, Suspense, useState } from "react";
import { toast } from "sonner";
import { IPump } from "../../pump/type/IPump";
import { PumpFuelItem } from "../type/IFuelPump";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const DeleteModal = lazy(() => import("@/components/DeleteModal"));
// const AssignFuelModal = lazy(() => import("./AssignFuelModal"));

export default function ActionBtns({ row }: { row: Row<PumpFuelItem> }) {
  const [open, setOpen] = useState<boolean>(false);
  const [Row, setRow] = useState<Row<PumpFuelItem> | undefined>(undefined);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutateAction<
    { data: IPump; msg: string },
    null
  >("delete", `pump-fuel/delete/${row?.original?.id}`);
  const handleDelete = () => {
    mutate(null, {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(
            error.response.data.message ||
              "Assigned fuel to pump failed to delete",
          );
          return;
        }

        if (error instanceof Error) {
          toast.error(
            error.message || "Assigned fuel to pump failed to delete",
          );
          return;
        }
        toast.error("Assigned fuel to pump failed to delete");
      },
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["fuelPumpL"],
        });
        toast.success(data.msg || "Delete assigned fuel to pump successfully");
        setTimeout(() => setOpen(false), 1000);
        return;
      },
    });
  };

  return (
    <>
      <div className="inline-flex  gap-2 items-center">
        <button
          type="button"
          onClick={() => {
            setRow(row);
            setOpen(true);
          }}
          className="px-4 py-1 border shadow-sm rounded-lg text-nowrap border-green-300 "
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => {
            setRow(row);
            setOpen(true);
          }}
          className="px-4 py-1 border shadow-sm rounded-lg border-green-300 "
        >
          Delete
        </button>
      </div>

      <Suspense>
        <DeleteModal
          action={handleDelete}
          deleteStatus={isPending}
          desc={"The assignment of the fuel to pump will be deleted"}
          heading="Fuel assigned to Pump"
          open={open}
          setOpen={setOpen}
        />
      </Suspense>

      {/* <Suspense>
        <AssignFuelModal row={editRow} open={open} setOpen={setOpen} />
      </Suspense> */}
    </>
  );
}

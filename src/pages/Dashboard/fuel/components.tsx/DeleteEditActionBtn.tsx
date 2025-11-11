import { RowData } from "@tanstack/react-table";
import { lazy, Suspense, useState } from "react";

const DeleteModal = lazy(() => import("../../../../components/DeleteModal"));

export default function DeleteEditActionBtn({ row }: { row: RowData }) {
  const [open, setOpen] = useState<boolean>(false);
  const handleDelete = () => {
    alert("delete");
  };
  return (
    <>
      <div className="inline-flex gap-2 items-center">
        <button
          type="button"
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
          action={handleDelete}
          heading="Delete Fuel Storage"
          desc="Are you sure you want to delete this item? 
          This action cannot be undone and will permanently
           remove the record from the system."
          open={open}
          setOpen={setOpen}
        />
      </Suspense>
    </>
  );
}

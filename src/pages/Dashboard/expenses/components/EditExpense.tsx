import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutateAction } from "@/hooks/useMutation";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { Row } from "@tanstack/react-table";
import { Expense } from "../types/apiGetExpenseResult";
import { expenseUpdateSchema, IExpenseUpdateSchema } from "../schema/Expense";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

interface IEditExpenseModalProps {
  row: Row<Expense>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function EditExpense({
  row,
  open,
  setOpen,
}: IEditExpenseModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IExpenseUpdateSchema>({
    resolver: zodResolver(expenseUpdateSchema),
    defaultValues: {
      category: "",
      amount: undefined,
      description: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutateAction<
    IExpenseUpdateSchema & { msg: string },
    IExpenseUpdateSchema
  >("put", `expenses/update/${row?.original?.id}`);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnSubmit: SubmitHandler<IExpenseUpdateSchema> = (data) => {
    const fileSize = file ? file.size / 1024 / 1024 : 0; // in MB
    if (file && fileSize > 5) {
      toast.error("File size should be less than 5MB");
      return;
    }
    const formData = new FormData();
    formData.set("amount", data.amount.toString());
    formData.set("category", data.category);
    formData.set("description", data.description);
    formData.set(
      "uploadPublicId",
      row.original.receiptUrlMetadata.public_id || "",
    );

    if (file && fileSize <= 5) {
      formData.set("file", file);
    }

    mutate(formData as unknown as IExpenseUpdateSchema, {
      onError: async (error) => {
        console.log(error);
        toast.error(error.message);
        return;
      },
      onSuccess: async (data) => {
        console.log(data.msg);
        toast.success(data.msg);
        await queryClient.invalidateQueries({
          queryKey: ["expenses"],
          //   exact: true,
        });
        closeBtnRef.current?.click();
        reset();
        return;
      },
    });
  };

  //update the Expense fields on mount"
  useEffect(() => {
    if (!open) return;

    reset({
      amount: Number(row?.original?.amount),
      category: row?.original?.category?.trim(),
      description: row?.original?.description,
    });

    setValue("amount", Number(row?.original?.amount));
    setValue("category", row?.original?.category?.trim());
    setValue("description", row?.original?.description);
  }, [row?.original?.id, open, reset]);

  const handleOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  return (
    <Dialog key={row?.original?.id} open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Edit Expense
          </DialogTitle>
          <DialogDescription>Edit Expense </DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="amount" className="">
                Amount
              </Label>
              <Input
                type="number"
                id="amount"
                {...register("amount")}
                placeholder="Enter the Amount"
              />

              {errors?.amount && (
                <small className="text-red-400">
                  {errors?.amount?.message}
                </small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="category" className="">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => {
                  console.log("CATEGORY VALUE:", field.value);
                  return (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* <SelectItem value="">Select category</SelectItem> */}
                        <SelectItem value="Fuel Purchase">
                          Fuel Purchase
                        </SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Utilities">Utilities</SelectItem>
                        <SelectItem value="Staff Welfare">
                          Staff Welfare
                        </SelectItem>
                        <SelectItem value="Logistics">Logistics</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  );
                }}
              />

              {errors?.category && (
                <small className="text-red-400">
                  {errors?.category?.message}
                </small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                id="description"
                {...register("description")}
                placeholder="e.g. Generator maintenance"
                className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {errors?.description && (
                <small className="text-red-400">
                  {errors.description.message}
                </small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="amount" className="">
                Receipt Upload
              </Label>
              <Input
                onChange={handleOnChangeFile}
                type="file"
                id="file"
                placeholder="Enter the Amount"
              />
            </div>

            <DialogFooter className="gap-2 justify-start">
              <Button
                type="submit"
                variant="outline"
                className="inline-flex gap-2 items-center "
              >
                {isPending && <Loading className="text-yellow-400 text-3xl" />}
                Edit
              </Button>
              <DialogClose asChild>
                <Button ref={closeBtnRef} type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

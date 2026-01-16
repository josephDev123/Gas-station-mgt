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
import { Dispatch, SetStateAction, useRef } from "react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { queryClient } from "@/App";
import { expenseSchema, IExpenseFormSchema } from "../schema/CreateExpense";
import { Textarea } from "@/components/ui/textarea";

const STATUS = ["ACTIVE", "INACTIVE"];
const fuelTypes = ["DIESEL", "GASOLINE", "PMS", "LPG"];

interface ICreateFuelModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
export default function CreateExpenseForm({
  open,
  onOpenChange,
}: ICreateFuelModalProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IExpenseFormSchema>({
    resolver: zodResolver(expenseSchema),
  });
  const { mutate, isPending, isError, error, data } = useMutateAction<
    IExpenseFormSchema & { msg: string },
    IExpenseFormSchema
  >("post", "nozzle/create");

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnSubmit: SubmitHandler<IExpenseFormSchema> = (data) => {
    console.log(data);
    mutate(data, {
      onError: async (error) => {
        console.log(error);
        toast.error(error.message);
        return;
      },
      onSuccess: async (data) => {
        console.log(data.msg);
        toast.success(data.msg);
        await queryClient.invalidateQueries({
          queryKey: ["pumpToNozzles"],
          //   exact: true,
        });
        closeBtnRef.current?.click();
        return;
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Create Expense
          </DialogTitle>
          <DialogDescription>Create Expense for user</DialogDescription>
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
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="assign pump to Nozzle" />
                    </SelectTrigger>
                    <SelectContent>
                      <option value="">Select category</option>
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
                )}
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

            <DialogFooter className="gap-2 justify-start">
              <Button
                type="submit"
                variant="outline"
                className="inline-flex gap-2 items-center "
              >
                {isPending && <Loading className="text-yellow-400 text-3xl" />}
                Create
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

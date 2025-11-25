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
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { queryClient } from "@/App";
import {
  IPumpSchema,
  IPumpUpdateSchema,
  pumpSchema,
  pumpUpdateSchema,
} from "../schema/PumpSchema";
import { IPump } from "../type/IPump";
import { Row } from "@tanstack/react-table";

type STATUS = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

const status = ["ACTIVE", "INACTIVE", "MAINTENANCE"] as STATUS[];

interface ICreateFuelModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row: Row<IPump>;
}
export default function EditPump({
  open,
  setOpen,
  row,
}: ICreateFuelModalProps) {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<IPumpUpdateSchema>({
    resolver: zodResolver(pumpUpdateSchema),
  });
  const { mutate, isPending } = useMutateAction<
    { data: IPump; msg: string },
    IPumpUpdateSchema
  >("put", `pump/update/${row?.original?.id}`);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnSubmit: SubmitHandler<IPumpUpdateSchema> = (data) => {
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
          queryKey: ["pump"],
        });
        reset();

        setTimeout(() => {
          closeBtnRef.current?.click();
        }, 500);

        return;
      },
    });
  };
  useEffect(() => {
    reset({
      name: row?.original?.name,
      status: row?.original?.status,
    });
  }, [row?.original?.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Edit Pump
          </DialogTitle>
          <DialogDescription>Edit Pump Configuration</DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="name" className="">
                Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter the Fuel name"
              />

              {errors.name && (
                <small className="text-red-400">{errors.name.message}</small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuelType" className="">
                Pump Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a pump status" />
                    </SelectTrigger>
                    <SelectContent>
                      {status.map((fuelType) => (
                        <SelectItem key={fuelType} value={fuelType}>
                          {fuelType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.status && (
                <small className="text-red-400">{errors.status.message}</small>
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

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
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { queryClient } from "@/App";

import { IPump } from "../../pump/type/IPump";
import { Row } from "@tanstack/react-table";
import { useQueryFacade } from "@/hooks/useFetch";
import { IFuel } from "../../fuel/type/IFuel";

type IFormType = {
  fuelId: number;
  volume: number;
};

interface ICreateFuelModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row: Row<IPump>;
}
export default function AssignFuelModal({
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
  } = useForm<IFormType>({});
  const { mutate, isPending } = useMutateAction<
    { data: any[]; msg: string },
    IFormType
  >("post", `pump-fuel/create`);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnAssignment: SubmitHandler<IFormType> = (data) => {
    if (!row.original.id) {
      toast.error("Pump id is required");
      return;
    }
    const payload: IFormType & { pumpId: number } = {
      fuelId: Number(data.fuelId),
      volume: Number(data.volume),
      pumpId: row.original.id,
    };
    console.log(payload);
    mutate(payload, {
      onError: async (error) => {
        console.log(error);
        toast.error(error.message);
        return;
      },
      onSuccess: async (data) => {
        console.log(data.msg);
        toast.success(data.msg);
        await queryClient.invalidateQueries({
          queryKey: ["fuel-pump"],
        });
        reset();

        setTimeout(() => {
          closeBtnRef.current?.click();
        }, 500);

        return;
      },
    });
  };

  const { isLoading, isError, data } = useQueryFacade<
    IFuel[],
    Error,
    string | object | number,
    { fuels: IFuel[]; totalCount: number; page: number }
  >(["fuel"], `fuel/find`);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Assign Fuel to Pump
          </DialogTitle>
          <DialogDescription>
            Assign Fuel to Pump Configuration
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleOnAssignment)}
            className="flex flex-col space-y-4"
          >
            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuelType" className="">
                Fuel Name
              </Label>
              <Controller
                name="fuelId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <SelectTrigger className="border focus:outline-none focus:ring-0 focus:ring-offset-0 ">
                      <SelectValue placeholder="Select a fuel name" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        "loading..."
                      ) : isError ? (
                        <small className="text-red-400">
                          Something went wrong
                        </small>
                      ) : (
                        <>
                          {data?.fuels.map((fuelName) => (
                            <SelectItem
                              key={fuelName.id}
                              value={String(fuelName.id)}
                            >
                              {fuelName.name}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors?.fuelId && (
                <small className="text-red-400">{errors.fuelId.message}</small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuel-volume" className="">
                Fuel Volume
              </Label>
              <Input
                type="number"
                id="fuel-volume"
                className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-transparent"
                {...register("volume", { min: 1 })}
                placeholder="Enter the Fuel Volume"
              />

              {errors?.volume && (
                <small className="text-red-400">{errors.volume.message}</small>
              )}
            </div>

            <DialogFooter className="gap-2 justify-start">
              <Button
                type="submit"
                variant="outline"
                className="inline-flex gap-2 items-center "
              >
                {isPending && <Loading className="text-yellow-400 text-3xl" />}
                Assign
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

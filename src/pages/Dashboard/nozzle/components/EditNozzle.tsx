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
import { IUpdateNozzleSchema, updateNozzleSchema } from "../schema/INozzle";
import { useQueryFacade } from "@/hooks/useFetch";
import { IPump } from "../../pump/type/IPump";
import { LoaderCircle } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Nozzle } from "../types/INozzle";

const STATUS = ["ACTIVE", "INACTIVE"];

interface ICreateFuelModalProps {
  row: Row<Nozzle>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function EditNozzle({
  row,
  open,
  setOpen,
}: ICreateFuelModalProps) {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<IUpdateNozzleSchema>({
    resolver: zodResolver(updateNozzleSchema),
  });
  const { mutate, isPending } = useMutateAction<
    IUpdateNozzleSchema & { msg: string },
    IUpdateNozzleSchema
  >("put", `nozzle/update/${row?.original?.id}`);

  //fetching pump
  const {
    isLoading,
    isError: isPumpError,
    error: pumpError,
    data: pumpData,
  } = useQueryFacade<
    IPump[],
    Error,
    string | object | number,
    { PumpQueryPaginate: IPump[]; totalCount: number; page: number }
  >(["pumps"], `pump/find`);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnSubmit: SubmitHandler<IUpdateNozzleSchema> = (data) => {
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

  //update the Nozzle fields on mount"
  useEffect(() => {
    setValue("name", row?.original?.name);
    setValue("status", row?.original?.status);
    setValue("pumpId", row?.original?.pumpId);
  }, [row?.original?.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Edit Nozzle
          </DialogTitle>
          <DialogDescription>Edit Nozzle for user</DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="name" className="">
                Nozzle Name
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
                Assign Nozzle to Pump
              </Label>
              <Controller
                name="pumpId"
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
                      {isLoading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : isPumpError ? (
                        <small className="text-red-400">
                          Pump data failed. You can assign pump later
                        </small>
                      ) : pumpData.PumpQueryPaginate.length <= 0 ? (
                        "No data yet. "
                      ) : (
                        <>
                          {pumpData.PumpQueryPaginate.map((pump) => (
                            <SelectItem key={pump.id} value={String(pump.id)}>
                              {pump.name}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.pumpId && (
                <small className="text-red-400">{errors.pumpId?.message}</small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuelType" className="">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS.map((status, i) => (
                        <SelectItem key={i} value={status}>
                          {status}
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

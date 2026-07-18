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
import { Row } from "@tanstack/react-table";
import { PumpFuelItem } from "../type/IFuelPump";
import { useFuelPump } from "../hooks/useFuelPump";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type STATUS = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

const status = ["ACTIVE", "INACTIVE", "MAINTENANCE"] as STATUS[];

interface IFuelPumpForm {
  pumpId: number;
  fuelId: number;
  volume: number;
}

interface ICreateFuelModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row: Row<PumpFuelItem>;
}
export default function EditFuelPump({
  open,
  setOpen,
  row,
}: ICreateFuelModalProps) {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<IFuelPumpForm>({
    defaultValues: {
      fuelId: row?.original?.fuel.id,
      pumpId: row?.original?.pump.id,
      volume: row?.original?.volume,
    },
    // resolver: zodResolver(pumpUpdateSchema),
  });
  const { mutate, isPending } = useMutateAction<
    { data: any; msg: string },
    IFuelPumpForm
  >("patch", `pump-fuel/update/${row?.original?.id}`);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnSubmit: SubmitHandler<IFuelPumpForm> = (data) => {
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
          queryKey: ["fuelPumpL"],
        });
        reset();

        setTimeout(() => {
          closeBtnRef.current?.click();
        }, 500);

        return;
      },
    });
  };

  const { query, pumpQuery } = useFuelPump();

  useEffect(() => {
    reset({
      fuelId: row?.original?.fuel.id,
      pumpId: row?.original?.pump.id,
      volume: row?.original?.volume,
    });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Edit Pump and Fuel
          </DialogTitle>
          <DialogDescription>Edit Pump Configuration</DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuelType" className="">
                Fuel name
              </Label>
              <Controller
                name="fuelId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString() ?? ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Fuel" />
                    </SelectTrigger>
                    <SelectContent>
                      {query.isLoading ? (
                        "loading..."
                      ) : query.isError ? (
                        <small className="text-red-400">
                          Something went wrong
                        </small>
                      ) : query?.data?.data?.fuels?.length <= 0 ? (
                        <span className="inline-flex gap-2">
                          No data.{" "}
                          <Link
                            to={"/dashboard/fuel"}
                            className="underline decoration-blue-600"
                          >
                            Create Fuel
                          </Link>
                        </span>
                      ) : (
                        <>
                          {query.data?.data?.fuels?.map((fuelName) => (
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
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuelType" className="">
                Pump name
              </Label>
              <Controller
                name="pumpId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString() ?? ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a pump " />
                    </SelectTrigger>
                    <SelectContent>
                      {pumpQuery?.isLoading ? (
                        "loading..."
                      ) : pumpQuery?.isError ? (
                        <small className="text-red-400">
                          Something went wrong
                        </small>
                      ) : pumpQuery?.data?.data?.PumpQueryPaginate?.length <=
                        0 ? (
                        <span className="inline-flex gap-2">
                          No data.{" "}
                          <Link
                            to={"/dashboard/pump"}
                            className="underline decoration-blue-600"
                          >
                            Create pump
                          </Link>
                        </span>
                      ) : (
                        <>
                          {pumpQuery.data?.data?.PumpQueryPaginate?.map(
                            (fuelName) => (
                              <SelectItem
                                key={fuelName.id}
                                value={String(fuelName.id)}
                              >
                                {fuelName.name}
                              </SelectItem>
                            ),
                          )}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="name" className="">
                Assigned volume
              </Label>
              <Input
                id="name"
                {...register("volume")}
                placeholder="Enter the Fuel name"
              />

              {/* {errors.name && (
                <small className="text-red-400">{errors.name.message}</small>
              )} */}
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

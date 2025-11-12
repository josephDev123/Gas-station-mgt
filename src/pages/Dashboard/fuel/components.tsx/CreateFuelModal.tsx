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
import {
  createFuelSchema,
  ICreateFuelSchema,
} from "../schema/createFuelSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Control } from "react-hook-form";
import { FormEventHandler, useRef } from "react";

const units = ["LITRE", "GALLON"];
const fuelTypes = ["DIESEL", "GASOLINE", "PMS", "LPG"];
export function CreateFuelModal() {
  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm<ICreateFuelSchema>({
    resolver: zodResolver(createFuelSchema),
  });
  const { mutate, isPending, isError, error, data } = useMutateAction<
    ICreateFuelSchema,
    Error
  >("post", "fuel/create");

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleOnSubmit: SubmitHandler<ICreateFuelSchema> = (data) => {
    console.log("Form data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="px-4 py-2 rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
        >
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Create Fuel Depot
          </DialogTitle>
          <DialogDescription>Manage your Fuel</DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <form
            ref={formRef}
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
                Fuel Type
              </Label>
              <Controller
                name="fuelType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map((fuelType) => (
                        <SelectItem key={fuelType} value={fuelType}>
                          {fuelType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.fuelType && (
                <small className="text-red-400">
                  {errors.fuelType.message}
                </small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuelVolume" className="">
                Fuel Volume
              </Label>
              <Controller
                name="fuelVolume"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter the Fuel Volume" />
                )}
              />

              {errors.fuelVolume && (
                <small className="text-red-400">
                  {errors.fuelVolume.message}
                </small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="unit" className="">
                Fuel Unit
              </Label>

              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Enter the Fuel unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit, idx) => (
                        <SelectItem key={idx} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.unit && (
                <small className="text-red-400">{errors.unit?.message}</small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="price_per" className="">
                Fuel per liter
              </Label>
              <Controller
                name="price_per"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    id="price_per"
                    {...field}
                    placeholder="Enter how much is a liter"
                  />
                )}
              />

              {errors.price_per && (
                <small className="text-red-400">
                  {errors.price_per?.message}
                </small>
              )}
            </div>
          </form>
        </div>
        <DialogFooter className="gap-2 justify-start">
          <Button
            onClick={() => formRef.current?.requestSubmit()}
            type="button"
            variant="outline"
          >
            Create
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

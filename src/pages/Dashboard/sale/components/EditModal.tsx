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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutateAction } from "@/hooks/useMutation";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { queryClient } from "@/App";

import { Row } from "@tanstack/react-table";
import { ISale } from "../types/ISale";
import { Nozzle } from "../../nozzle/types/INozzle";
import { useQueryFacade } from "@/hooks/useFetch";
import { UsersResponseData } from "@/types/IUsers";
import { PumpFuelItem, PumpFuelResponse } from "../../FuelPump/type/IFuelPump";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ICreateSalesPayloadSchema } from "./CreateSales";

type ISaleUpdate = {
  pump_fuel_id: number;
  user_id: number;
  nozzle_id: number;
  liter_sold: number;
  price_per: number;
  id: number;
  total_price_calc: number;
  createdAt: Date;
  updatedAt: Date;
};

interface ICreateFuelModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row: Row<ISale>;
}
export default function EditSale({
  open,
  setOpen,
  row,
}: ICreateFuelModalProps) {
  const [userId, setUserId] = useState(null);
  const [nozzleId, setNozzleId] = useState(null);
  const [fuelPumpId, setFuelPumpId] = useState(null);
  const [litreSold, setLitreSold] = useState(null);
  const [pricePerLiter, setPricePerLiter] = useState(null);

  const { isLoading, isError, error, data } = useQueryFacade<
    Nozzle[],
    Error,
    string | object | number,
    { nozzles: Nozzle[]; totalCount: number; page: number }
  >(["Nozzles"], `nozzle`);

  const {
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
    data: userData,
  } = useQueryFacade<
    UsersResponseData[],
    Error,
    string | object | number,
    UsersResponseData
  >(["users"], `/auth/users`);

  const {
    isLoading: pumpPumpIsLoading,
    isError: pumpPumpIsError,
    error: pumpPumpError,
    data: pumpPumData,
  } = useQueryFacade<
    PumpFuelResponse[],
    Error,
    string | object | number,
    { PumpFuelData: PumpFuelItem[]; totalCount: number; page: number }
  >(["fuelPumpL"], `pump-fuel/find`);

  const { mutate, isPending } = useMutateAction<
    { data: ISaleUpdate; msg: string },
    Partial<ICreateSalesPayloadSchema>
  >("put", `sales/update/${row?.original?.id}`);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOnSubmit = (e: FormEvent) => {
    if (!userId || !nozzleId || !fuelPumpId || !litreSold || !pricePerLiter) {
      toast.error("Please fill all fields");
      return;
    }

    e.preventDefault();

    const payload: Partial<ICreateSalesPayloadSchema> = {
      user_id: Number(userId),
      nozzle_id: Number(nozzleId),
      pump_fuel_id: Number(fuelPumpId),
      liter_sold: Number(litreSold),
      price_per: Number(pricePerLiter),
    };
    mutate(payload, {
      onError: async (error) => {
        console.log(error);
        toast.error(error.message || "Error updating sale");
        return;
      },
      onSuccess: async (data) => {
        console.log(data.msg);
        toast.success(data.msg || "Sale updated successfully");
        await queryClient.invalidateQueries({
          queryKey: ["sales"],
        });

        setTimeout(() => {
          closeBtnRef.current?.click();
        }, 500);

        return;
      },
    });
  };
  useEffect(() => {
    setUserId(row?.original?.User?.id);
    setNozzleId(row?.original?.Nozzle?.id);
    setFuelPumpId(row?.original?.PumpFuel?.id);
    setLitreSold(row?.original?.liter_sold);
    setPricePerLiter(row?.original?.PumpFuel?.fuel?.price_per);
  }, [row?.original?.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Edit Sale
          </DialogTitle>
          <DialogDescription>Edit Sale Configuration</DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <form onSubmit={handleOnSubmit} className="flex flex-col space-y-4">
            <div className="w-full">
              <Label htmlFor="User">Select User</Label>
              <Select
                onValueChange={(value) => setUserId(Number(value))}
                value={String(userId)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {userIsLoading ? (
                      <LoaderCircle />
                    ) : userIsError ? (
                      <small className="text-red-400">
                        {userError.message || "Something went wrong"}
                      </small>
                    ) : userData!?.Users?.length <= 0 ? (
                      <SelectItem value="no data">No data</SelectItem>
                    ) : (
                      <>
                        {userData!?.Users?.map((user) => (
                          <SelectItem key={user.id} value={String(user.id)}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Label htmlFor="User">Nozzle</Label>
              <Select
                onValueChange={(value) => setNozzleId(Number(value))}
                value={String(nozzleId)}
              >
                <SelectTrigger className=" w-full">
                  <SelectValue placeholder="Nozzle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {isLoading ? (
                      <LoaderCircle />
                    ) : isError ? (
                      <small className="text-red-400">
                        Something went wrong
                      </small>
                    ) : data?.nozzles?.length <= 0 ? (
                      <span className="inline-flex gap-2">
                        No data.{" "}
                        <Link
                          to={"/dashboard/nozzle"}
                          className="underline decoration-blue-600"
                        >
                          Create Nozzle
                        </Link>
                      </span>
                    ) : (
                      <>
                        {data?.nozzles?.map((nozzle, i) => (
                          <SelectItem key={nozzle.id} value={String(nozzle.id)}>
                            {nozzle.name}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Label htmlFor="User">Fuel to Pump</Label>
              <Select
                onValueChange={(value) => {
                  setFuelPumpId(Number(value));
                  const selectedPump = pumpPumData?.PumpFuelData.find(
                    (pump) => pump.id === Number(value)
                  );
                  //   setPricePerLiter(
                  //     selectedPump ? selectedPump.fuel.price_per : null
                  //   );
                }}
                value={String(fuelPumpId)}
              >
                <SelectTrigger className=" w-full">
                  <SelectValue placeholder="Fuel To Pump" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {pumpPumpIsLoading ? (
                      <LoaderCircle />
                    ) : pumpPumpIsError ? (
                      <small className="text-red-400">
                        Something went wrong
                      </small>
                    ) : pumpPumData?.PumpFuelData?.length <= 0 ? (
                      <span className="inline-flex gap-2">No data.</span>
                    ) : (
                      <>
                        {pumpPumData?.PumpFuelData?.map((fuelPump, i) => (
                          <SelectItem
                            key={fuelPump.id}
                            value={String(fuelPump.id)}
                          >
                            {fuelPump?.fuel?.name || "N/A"} {"->"}{" "}
                            {fuelPump?.pump?.name || "N/A"}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className=" w-full  items-center ">
              <Label htmlFor="litre_sold">Litre sold</Label>
              <Input
                type="number"
                value={String(litreSold)}
                onChange={(e) => setLitreSold(Number(e.target.value))}
                id="litre_sold"
                placeholder="Litre sold"
              />
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

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryFacade } from "@/hooks/useFetch";
import { LoaderCircle } from "lucide-react";
import { Nozzle } from "../../nozzle/types/INozzle";
import { UsersResponseData } from "@/types/IUsers";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PumpFuelItem, PumpFuelResponse } from "../../FuelPump/type/IFuelPump";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutateAction } from "@/hooks/useMutation";
import { IApiCreateSchema } from "../types/IApiCreate";
// import { queryClient } from "@/App";
import Loading from "@/components/Loading";
import { useQueryClient } from "@tanstack/react-query";

export type ICreateSalesPayloadSchema = Omit<
  IApiCreateSchema,
  "id" | "total_price_calc" | "createdAt" | "updatedAt"
>;

export default function CreateSales() {
  const [userId, setUserId] = useState(null);
  const [nozzleId, setNozzleId] = useState(null);
  const [fuelPumpId, setFuelPumpId] = useState(null);
  const [litreSold, setLitreSold] = useState(null);
  const [pricePerLiter, setPricePerLiter] = useState(null);
  const [customerName, setCustomerName] = useState("");

  const queryClient = useQueryClient();

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
    { msg: string; data: IApiCreateSchema },
    ICreateSalesPayloadSchema
  >("post", "sales/create");

  const handleCreateSales = async () => {
    if (!userId || !nozzleId || !fuelPumpId || !litreSold || !pricePerLiter) {
      toast.error("Please fill all fields");
      return;
    }

    const payload: ICreateSalesPayloadSchema = {
      user_id: Number(userId),
      nozzle_id: Number(nozzleId),
      pump_fuel_id: Number(fuelPumpId),
      liter_sold: Number(litreSold),
      price_per: Number(pricePerLiter),
      customerName: customerName,
    };

    mutate(payload, {
      onSuccess: async (data) => {
        toast.success(data.msg || "Sale created successfully");
        await queryClient.invalidateQueries({ queryKey: ["sales"] });
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong");
      },
    });
  };

  return (
    <section className="mt-6 flex flex-col space-y-4">
      <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <div className="w-full">
          <Label htmlFor="User">Select User</Label>
          <Select onValueChange={(value) => setUserId(Number(value))}>
            <SelectTrigger className="sm:w-[250px] w-full">
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
          <Select onValueChange={(value) => setNozzleId(Number(value))}>
            <SelectTrigger className="sm:w-[250px] w-full">
              <SelectValue placeholder="Nozzle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isLoading ? (
                  <LoaderCircle />
                ) : isError ? (
                  <small className="text-red-400">Something went wrong</small>
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
              setPricePerLiter(
                selectedPump ? selectedPump.fuel.price_per : null
              );
            }}
          >
            <SelectTrigger className="sm:w-[250px] w-full">
              <SelectValue placeholder="Fuel To Pump" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {pumpPumpIsLoading ? (
                  <LoaderCircle />
                ) : pumpPumpIsError ? (
                  <small className="text-red-400">Something went wrong</small>
                ) : pumpPumData?.PumpFuelData?.length <= 0 ? (
                  <span className="inline-flex gap-2">No data.</span>
                ) : (
                  <>
                    {pumpPumData?.PumpFuelData?.map((fuelPump, i) => (
                      <SelectItem key={fuelPump.id} value={String(fuelPump.id)}>
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

        <div className=" w-full  items-center sm:w-[250px]">
          <Label htmlFor="litre_sold">Litre sold</Label>
          <Input
            type="number"
            onChange={(e) => setLitreSold(Number(e.target.value))}
            id="litre_sold"
            placeholder="Litre sold"
          />
        </div>

        <div className=" w-full  items-center sm:w-[250px]">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            type="text"
            onChange={(e) => setCustomerName(e.target.value)}
            id="customerName"
            placeholder="Enter Customer Name"
          />
        </div>

        <div className=" w-full self-end  items-center sm:w-[250px]">
          <Button
            onClick={handleCreateSales}
            type="button"
            className="bg-green-400 text-black hover:text-white inline-flex gap-2 items-center"
          >
            Create Sale{" "}
            {isPending && <Loading className="text-yellow-400 text-3xl" />}
          </Button>
        </div>
      </section>
    </section>
  );
}

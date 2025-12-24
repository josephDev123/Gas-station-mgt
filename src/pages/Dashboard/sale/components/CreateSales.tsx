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

export default function CreateSales() {
  const [userId, setUserId] = useState(null);
  const [nozzleId, setNozzleId] = useState(null);

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
  return (
    <section className="grid grid-cols-4 gap-4 mt-4">
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
                    <SelectItem value={String(nozzle.id)}>
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
        <Select onValueChange={(value) => setNozzleId(Number(value))}>
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
                <span className="inline-flex gap-2">
                  No data.
                  {/* <Link
                    to={"/dashboard/nozzle"}
                    className="underline decoration-blue-600"
                  >
                    Assign Fuel to Nozzle
                  </Link> */}
                </span>
              ) : (
                <>
                  {pumpPumData?.PumpFuelData?.map((fuelPump, i) => (
                    <SelectItem value={String(fuelPump.id)}>
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

      <div className="grid w-full max-w-sm items-center ">
        <Label htmlFor="litre_sold">Litre sold</Label>
        <Input type="number" id="litre_sold" placeholder="Litre sold" />
      </div>
    </section>
  );
}

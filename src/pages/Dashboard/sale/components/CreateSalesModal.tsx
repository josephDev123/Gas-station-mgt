import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { useQueryFacade } from "@/hooks/useFetch";
import { useMutateAction } from "@/hooks/useMutation";
import Loading from "@/components/Loading";

import { Nozzle } from "../../nozzle/types/INozzle";
import { UsersResponseData } from "@/types/IUsers";
import { PumpFuelItem, PumpFuelResponse } from "../../FuelPump/type/IFuelPump";
import { IApiCreateSchema } from "../types/IApiCreate";

export type ICreateSalesPayloadSchema = Omit<
  IApiCreateSchema,
  "id" | "total_price_calc" | "createdAt" | "updatedAt"
>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateSalesModal({ open, onClose }: Props) {
  const [userId, setUserId] = useState<number | null>(null);
  const [nozzleId, setNozzleId] = useState<number | null>(null);
  const [fuelPumpId, setFuelPumpId] = useState<number | null>(null);
  const [litreSold, setLitreSold] = useState<number | null>(null);
  const [pricePerLiter, setPricePerLiter] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQueryFacade<
    Nozzle[],
    Error,
    string | object | number,
    { nozzles: Nozzle[] }
  >(["Nozzles"], `nozzle`);

  const {
    isLoading: userIsLoading,
    isError: userIsError,
    data: userData,
  } = useQueryFacade<
    UsersResponseData[],
    Error,
    string | object | number,
    UsersResponseData
  >(["users"], `/auth/users`);

  const {
    isLoading: pumpIsLoading,
    isError: pumpIsError,
    data: pumpData,
  } = useQueryFacade<
    PumpFuelResponse[],
    Error,
    string | object | number,
    { PumpFuelData: PumpFuelItem[] }
  >(["fuelPumpL"], `pump-fuel/find`);

  /* -------------------- Mutation -------------------- */

  const { mutate, isPending } = useMutateAction<
    { msg: string; data: IApiCreateSchema },
    ICreateSalesPayloadSchema
  >("post", "sales/create");

  const resetForm = () => {
    setUserId(null);
    setNozzleId(null);
    setFuelPumpId(null);
    setLitreSold(null);
    setPricePerLiter(null);
    setCustomerName("");
  };

  const handleCreateSales = () => {
    if (!userId || !nozzleId || !fuelPumpId || !litreSold || !pricePerLiter) {
      toast.error("Please fill all fields");
      return;
    }

    mutate(
      {
        user_id: userId,
        nozzle_id: nozzleId,
        pump_fuel_id: fuelPumpId,
        liter_sold: litreSold,
        price_per: pricePerLiter,
        customerName,
      },
      {
        onSuccess: async (data) => {
          toast.success(data.msg || "Sale created successfully");
          await queryClient.invalidateQueries({ queryKey: ["sales"] });
          resetForm();
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="w-[95%] sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Sale</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* USER */}
          <div className="space-y-2">
            <Label>Select User</Label>
            <Select onValueChange={(v) => setUserId(Number(v))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {userIsLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : userIsError ? (
                    <small className="text-red-400">Error loading users</small>
                  ) : userData?.Users?.length ? (
                    userData.Users.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-data">No data</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* NOZZLE */}
          <div className="space-y-2">
            <Label>Nozzle</Label>
            <Select onValueChange={(v) => setNozzleId(Number(v))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select nozzle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : isError ? (
                    <small className="text-red-400">
                      Error loading nozzles
                    </small>
                  ) : data?.nozzles?.length ? (
                    data.nozzles.map((nozzle) => (
                      <SelectItem key={nozzle.id} value={String(nozzle.id)}>
                        {nozzle.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 text-sm">
                      No data.{" "}
                      <Link
                        to="/dashboard/nozzle"
                        className="underline text-blue-500"
                      >
                        Create Nozzle
                      </Link>
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* FUEL PUMP */}
          <div className="space-y-2">
            <Label>Fuel to Pump</Label>
            <Select
              onValueChange={(value) => {
                setFuelPumpId(Number(value));
                const selected = pumpData?.PumpFuelData.find(
                  (p) => p.id === Number(value),
                );
                setPricePerLiter(selected?.fuel?.price_per ?? null);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select fuel pump" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {pumpIsLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : pumpIsError ? (
                    <small className="text-red-400">Error loading pumps</small>
                  ) : pumpData?.PumpFuelData?.length ? (
                    pumpData.PumpFuelData.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.fuel?.name} → {item.pump?.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-data">No data</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* LITRE SOLD */}
          <div className="space-y-2">
            <Label>Litre Sold</Label>
            <Input
              type="number"
              placeholder="Enter litre sold"
              onChange={(e) => setLitreSold(Number(e.target.value))}
            />
          </div>

          {/* CUSTOMER NAME */}
          <div className="space-y-2">
            <Label>Customer Name</Label>
            <Input
              type="text"
              placeholder="Enter customer name"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          {/* ACTION */}
          <Button
            onClick={handleCreateSales}
            className="w-full bg-green-500 text-black hover:text-white"
          >
            Create Sale
            {isPending && <Loading className="ml-2 text-xl" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

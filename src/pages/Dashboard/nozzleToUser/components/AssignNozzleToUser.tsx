import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryFacade } from "@/hooks/useFetch";
import { FaArrowRight } from "react-icons/fa6";
import { Nozzle } from "../../nozzle/types/INozzle";
import { LoaderCircle } from "lucide-react";
import { UsersResponseData } from "@/types/IUsers";
import { Link } from "react-router-dom";
import { useMutateAction } from "@/hooks/useMutation";
import { INozzleUserAssign } from "../schema/NozzleToUserSchema";
import { useState } from "react";
import { toast } from "sonner";
import { queryClient } from "@/App";

export default function AssignNozzleToUser() {
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
    mutate,
    isPending,
    isError: nozzleToUserError,
  } = useMutateAction<any[], INozzleUserAssign>(
    "post",
    `nozzle-to-user/create`
  );

  const handleUserAssignment = async () => {
    if (!userId || !nozzleId) {
      toast.error("Please select both User and Nozzle");
      return;
    }
    mutate(
      { user_id: userId, nozzle_id: nozzleId },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries({ queryKey: ["nozzleToUser"] });
          toast.success("Nozzle assigned to User successfully");
        },
        onError: (error) => {
          toast.error(
            error?.message || "Failed to assign Nozzle to User. Try again."
          );
        },
      }
    );
  };
  return (
    <section className="mt-3">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="inline-flex gap-6 items-center">
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

          <div className="flex flex-col items-center justify-center">
            <p>Assign</p>
            <FaArrowRight />
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
        </div>

        <Button
          //   onClick={() => SetIsCreateNozzleOpen(true)}
          onClick={handleUserAssignment}
          variant="default"
          className="px-4 py-2 inline-flex gap-2 items-center rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
        >
          assign Nozzle{" "}
          {isPending && (
            <LoaderCircle className="animate-spin text-yellow-500" />
          )}
        </Button>
      </div>
    </section>
  );
}

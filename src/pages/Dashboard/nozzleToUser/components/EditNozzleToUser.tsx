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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { queryClient } from "@/App";
import { useQueryFacade } from "@/hooks/useFetch";
import { LoaderCircle } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { FaArrowRight } from "react-icons/fa";
import { INozzleUserAssign } from "../schema/NozzleToUserSchema";
import { UsersResponseData } from "@/types/IUsers";
import { Nozzle, NozzleToUser } from "../types/INozzleToUser";
import { Link } from "react-router-dom";

interface IEditNozzleToUserProps {
  row: Row<NozzleToUser>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function EditNozzleToUser({
  row,
  open,
  setOpen,
}: IEditNozzleToUserProps) {
  const [userId, setUserId] = useState(null);
  const [nozzleId, setNozzleId] = useState(null);
  //   const [nozzleName, setNozzleName] = useState(null);

  //   const [userName, setUserName] = useState(null);
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
    "put",
    `nozzle-to-user/edit/${row?.original?.id}`
  );

  const handleUpdateUserAssignment = async () => {
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
          setOpen(false);
        },
        onError: (error) => {
          toast.error(
            error?.message || "Failed to assign Nozzle to User. Try again."
          );
        },
      }
    );
  };

  // update the Nozzle fields on mount"
  useEffect(() => {
    // setNozzleName(row?.original?.nozzle?.name);
    // setUserName(row?.original?.user?.name);
    setUserId(row?.original?.user_id);
    setNozzleId(row?.original?.nozzle_id);
  }, [row?.original?.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Edit User Assignment
          </DialogTitle>
          <DialogDescription>Edit User Assignment to Nozzle</DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <section className="mt-3">
            <div className="flex flex-col gap-2 items-center justify-between">
              <div className="flex flex-col gap-6 items-center w-full">
                <div className="w-full">
                  <Label htmlFor="User">Select User</Label>
                  <Select
                    onValueChange={(value) => setUserId(Number(value))}
                    value={String(userId)}
                  >
                    <SelectTrigger className=" w-full">
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
                  <FaArrowRight className="rotate-90" />
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
                onClick={handleUpdateUserAssignment}
                variant="default"
                className="w-full px-4 py-2 inline-flex gap-2 items-center rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
              >
                assign Nozzle{" "}
                {isPending && (
                  <LoaderCircle className="animate-spin text-yellow-500" />
                )}
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

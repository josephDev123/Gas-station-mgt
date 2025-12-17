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

export default function AssignNozzleToUser() {
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
    Nozzle[],
    Error,
    string | object | number,
    { nozzles: Nozzle[]; totalCount: number; page: number }
  >(["users"], `nozzle`);
  return (
    <section className="mt-3">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="inline-flex gap-6 items-center ">
          <div className="w-full">
            <Label htmlFor="User">Select User</Label>
            <Select>
              <SelectTrigger className="sm:w-[250px] w-full">
                <SelectValue placeholder="Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Europe & Africa</SelectLabel> */}

                  <SelectItem value="value"></SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <FaArrowRight />
          </div>

          <div className="w-full">
            <Label htmlFor="User">Nozzle</Label>
            <Select>
              <SelectTrigger className="sm:w-[250px] w-full">
                <SelectValue placeholder="Nozzle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Europe & Africa</SelectLabel> */}
                  {isLoading ? (
                    <LoaderCircle />
                  ) : isError ? (
                    <SelectItem value="error" className="text-red-400">
                      Something went wrong
                    </SelectItem>
                  ) : data.nozzles.length <= 0 ? (
                    <SelectItem value="no data">No data</SelectItem>
                  ) : (
                    <>
                      {data?.nozzles.map((nozzle, i) => (
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
          variant="default"
          className="px-4 py-2 rounded-md  shadow-inner bg-green-500 hover:bg-green-600 text-white"
        >
          assign Nozzle
        </Button>
      </div>
    </section>
  );
}

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

const units = ["LITRE", "GALLON"];
const fuelTypes = ["DIESEL", "GASOLINE", "PMS", "LPG"];
export function CreateFuelModal() {
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
      <DialogContent className="sm:max-w-[500px] w-[90%] ">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Create Fuel Depot
          </DialogTitle>
          <DialogDescription>Manage your Fuel</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full gap-2 sm:h-auto h-[50%]">
          <form className="flex flex-col space-y-4">
            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="name" className="">
                Name
              </Label>
              <Input id="name" placeholder="Enter the Fuel name" />
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuelType" className="">
                Fuel Type
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Enter the Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((fuelType, idx) => (
                    <SelectItem key={idx} value={fuelType}>
                      {fuelType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="fuelVolume" className="">
                Fuel Volume
              </Label>
              <Input id="fuelVolume" placeholder="Enter the Fuel Volumn" />
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="unit" className="">
                Fuel Unit
              </Label>

              <Select>
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
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="price_per" className="">
                Fuel per liter
              </Label>
              <Input id="price_per" placeholder="Enter how much is a liter" />
            </div>
          </form>
        </div>
        <DialogFooter className="gap-2 justify-start">
          <Button type="button" variant="outline">
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

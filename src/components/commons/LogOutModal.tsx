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
import { Dispatch, ReactNode, SetStateAction } from "react";
import Loading from "../Loading";

interface ILogOutModalProps<T> {
  action: (id?: T) => void;
  heading: string | ReactNode;
  desc: string | ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // deleteStatus: boolean;
}
export default function LogOutModal<T>({
  desc,
  heading,
  action,
  open,
  setOpen,
}: // deleteStatus,
ILogOutModalProps<T>) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sm:text-3xl text-2xl font-bold">
            {heading}
          </DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2"></div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            className="inline-flex gap-2 items-center"
            onClick={() => action()}
            type="button"
            variant="destructive"
          >
            Logout{" "}
            {/* {deleteStatus && <Loading className="text-3xl text-yellow-500" />} */}
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

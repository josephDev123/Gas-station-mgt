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

import { useMutateAction } from "@/hooks/useMutation";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { queryClient } from "@/App";
import { Row } from "@tanstack/react-table";
import { IUser } from "../types/User";
import { IUserSchema, UserSchema } from "../scheme/UserSchema";
import CustomAvatar from "@/components/CustomAvatar";
import { FiEdit } from "react-icons/fi";
import { images } from "@/utils/images";

interface EditUserProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row: Row<IUser>;
}
export default function EditUser({ row, open, setOpen }: EditUserProps) {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<IUserSchema>({
    resolver: zodResolver(UserSchema),
  });
  const [file, setFile] = useState<File | string | null>(null);

  const { mutate, isPending } = useMutateAction<
    IUserSchema & { msg: string },
    IUserSchema
  >("patch", `auth/create-update/${row?.original?.id}`);

  // const file = watch("profile.avatar")?.[0];

  const existingAvatar =
    file && file instanceof File
      ? URL.createObjectURL(file)
      : typeof file === "string"
      ? row?.original?.profile?.avatar
      : images.avatar;

  const previewImage = existingAvatar;

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit: SubmitHandler<IUserSchema> = (data) => {
    console.log(data);
    console.log(file);
    const formData = new FormData();
    if (file && file instanceof File) {
      formData.append("profile-pic", file);
    }

    formData.set("email", data.email);
    formData.set("name", data.name);
    formData.set("role", data.role);
    formData.set("address", data.profile.address);
    formData.set("phone_no", data.profile.phone_no);
    mutate(formData as any, {
      onError: (error) => {
        console.log("error", error);
        toast.error(error.message || error.toString());
        return;
      },
      onSuccess: async (data) => {
        // console.log(data.msg);
        reset();
        toast.success(data.msg);
        await queryClient.invalidateQueries({
          queryKey: ["staffs"],
          exact: true,
        });
        setTimeout(() => closeBtnRef.current?.click(), 1000);

        return;
      },
    });
  };

  useEffect(() => {
    setValue("name", row?.original?.name);
    setValue("email", row?.original?.email);
    setValue("role", row?.original?.role as "ATTENDANT" | "ADMIN" | "MANAGER");
    // setValue("profile.avatar", row?.original?.profile?.avatar || "");
    setValue("profile.address", row?.original?.profile?.address || "");
    setValue("profile.phone_no", row?.original?.profile?.phone_no || "");
  }, [open]);

  useEffect(() => setFile(row?.original?.profile?.avatar), [open]);

  useEffect(() => {
    if (!file || !(file instanceof File)) return;

    const objectUrl = URL.createObjectURL(file);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90%] sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-xl font-bold">
            Edit User Detail
          </DialogTitle>
          <DialogDescription>Edit User Info</DialogDescription>
        </DialogHeader>
        <div className="flex-1 w-full gap-2 overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex flex-col space-y-4"
          >
            <div className="grid grid-cols-1 gap-2 mx-auto">
              <div className="relative">
                <CustomAvatar
                  alt="profile pic"
                  className="border border-gray-700"
                  src={previewImage}
                />

                <FiEdit
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 -right-5 text-xl cursor-pointer"
                />
              </div>
            </div>

            <div className="mx-auto mt-0">
              {/* {errors.profile?.avatar && (
                <small className="text-red-400 "> */}
              {/* {errors.profile.avatar?.message || "Invalid file"} */}
              {/* </small>
              )} */}
            </div>

            <div className="hidden">
              <Label htmlFor="profile-avatar">Attach profile image</Label>

              <input
                type="file"
                ref={fileRef}
                onChange={(e) => setFile(e.target.files[0])}
                id="profile-avatar"
                accept="image/*"
                // {...register("profile.avatar")}
                // ref={(el) => {
                //   register("profile.avatar").ref(el);
                //   fileRef.current = el;
                // }}
              />
            </div>

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
              <Label htmlFor="email" className="">
                Email
              </Label>
              <Input disabled readOnly id="email" {...register("email")} />
              {/* 
              {errors.email && (
                <small className="text-red-400">{errors.email.message}</small>
              )} */}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="role" className="">
                Role
              </Label>
              <Input
                id="role"
                {...register("role")}
                placeholder="Enter the role"
              />

              {errors.role && (
                <small className="text-red-400">{errors.role.message}</small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="address" className="">
                Address
              </Label>
              <Input
                id="address"
                {...register("profile.address")}
                placeholder="Enter the address"
              />

              {errors.profile?.address && (
                <small className="text-red-400">
                  {errors.profile?.address?.message}
                </small>
              )}
            </div>

            <div className="grid grid-cols-1  gap-2">
              <Label htmlFor="phone_no" className="">
                Phone Number
              </Label>
              <Input
                id="phone_no"
                {...register("profile.phone_no")}
                placeholder="Enter the phone number"
              />

              {errors.profile?.phone_no && (
                <small className="text-red-400">
                  {errors.profile?.phone_no?.message}
                </small>
              )}
            </div>

            {/* <div className="grid grid-cols-1  gap-2">
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
            </div> */}

            <DialogFooter className="gap-2 justify-start">
              <Button
                type="submit"
                variant="outline"
                className="inline-flex gap-2 items-center "
              >
                {isPending && <Loading className="text-yellow-400 text-3xl" />}
                Update
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

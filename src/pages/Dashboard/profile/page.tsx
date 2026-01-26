import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { IProfileSchema, profileSchema } from "./schema/profileSchema";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import CustomAvatar from "@/components/CustomAvatar";
import { images } from "@/utils/images";
import { useMutateAction } from "@/hooks/useMutation";
import { toast } from "sonner";
import { fetchUser } from "@/lib/redux/actions/fetchUser";

export default function Profile() {
  const session = useAppSelector((state) => state.user);
  const [preview, setPreview] = useState<string | null>(
    session.profile.avatar || null,
  );
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  console.log("profile", preview, file);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session.name.trim(),
      email: session.email.trim(),
      address: session.profile.address.trim(),
      phone_no: session.profile.phone_no.trim(),
      role: session.role.trim(),
    },
  });

  console.log(errors);

  const { mutate, isPending } = useMutateAction(
    "patch",
    `auth/upsert-profile/${session.id}`,
  );

  const handleOnSubmit = async (data: IProfileSchema) => {
    const payload = new FormData();
    if (data.name) payload.set("name", data.name);
    if (data.address) payload.set("address", data.address);
    if (data.phone_no) payload.set("phone_no", data.phone_no);
    if (data.role) payload.set("role", data.role);
    if (session?.profile?.avatarMetadata?.public_id)
      payload.set("avatarPublicId", session.profile.avatarMetadata.public_id);
    if (file) payload.set("profile-pic", file);

    if (!session.id) {
      toast.error("User id is needed");
      return;
    }

    mutate(payload, {
      onError: (error) => {
        toast.error(error.message || "profile update failed");
        return;
      },
      onSuccess: (data) => {
        dispatch(fetchUser());
        toast.success("Profile  update Successfully");
        return;
      },
    });
  };

  // clear up url
  // useEffect(() => {
  //   // if (!preview) return;
  //   if (!file) return;
  //   let url = URL.createObjectURL(file);
  //   setPreview(url);
  //   return () => URL.revokeObjectURL(url);
  // }, [file]);

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <CustomAvatar
          alt="logo"
          src={(preview || images.avatar).toString()}
          className="border-2 object-cover sm:size-10 size-6 cursor-pointer"
        />
        <label className="cursor-pointer text-sm text-blue-600">
          Change Avatar
          <input
            type="file"
            accept="image/*"
            className="hidden"
            // {...register("avatar")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setPreview(URL.createObjectURL(file));
              setFile(file);
            }}
          />
        </label>
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full mt-1 rounded-lg border px-3 py-2"
            {...register("name")}
          />
          {errors?.name && (
            <p className="text-red-500 text-xs">{errors?.name?.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            disabled
            className="w-full mt-1 rounded-lg border px-3 py-2 bg-gray-100"
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-red-500 text-xs">{errors?.email?.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            className="w-full mt-1 rounded-lg border px-3 py-2"
            {...register("address")}
          />
          {errors?.address && (
            <p className="text-red-500 text-xs">{errors?.address?.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            className="w-full mt-1 rounded-lg border px-3 py-2"
            {...register("phone_no")}
          />
          {errors?.phone_no && (
            <p className="text-red-500 text-xs">{errors?.phone_no?.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            readOnly={session.role !== "ADMIN"}
            {...register("role")}
            className="w-full mt-1 rounded-lg border px-3 py-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          {isPending ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

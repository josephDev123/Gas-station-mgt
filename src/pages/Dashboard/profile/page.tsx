import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// ----------------------
// Zod Schema
// ----------------------
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(2, "Address is required"),
  phone_no: z
    .string()
    .regex(/^0[0-9]{10}$/, "Phone number must be a valid Nigerian number"),
  avatar: z
    .any()
    .optional()
    .refine((file) => !file || file?.length === 1, "Please upload one image"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// ----------------------
// Mock User Data (API response)
// ----------------------
const user = {
  id: 1,
  email: "Bunmi55@gmail.com",
  name: "Bunmi Uzuegbu",
  role: "ATTENDANT",
  profile: {
    avatar:
      "https://res.cloudinary.com/drm0sixwc/image/upload/v1767812019/FuelSystem/profile.png",
    address: "Sabo",
    phone_no: "08130197306",
  },
};

// ----------------------
// Profile Component
// ----------------------
export default function Profile() {
  const [preview, setPreview] = useState<string | null>(user.profile.avatar);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      address: user.profile.address,
      phone_no: user.profile.phone_no,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Profile Update Payload:", data);
    // Call API here
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={preview || "/avatar-placeholder.png"}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <label className="cursor-pointer text-sm text-blue-600">
          Change Avatar
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("avatar")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            className="w-full mt-1 rounded-lg border px-3 py-2"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            disabled
            className="w-full mt-1 rounded-lg border px-3 py-2 bg-gray-100"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            className="w-full mt-1 rounded-lg border px-3 py-2"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            className="w-full mt-1 rounded-lg border px-3 py-2"
            {...register("phone_no")}
          />
          {errors.phone_no && (
            <p className="text-red-500 text-xs">{errors.phone_no.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            disabled
            value={user.role}
            className="w-full mt-1 rounded-lg border px-3 py-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          {isSubmitting ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

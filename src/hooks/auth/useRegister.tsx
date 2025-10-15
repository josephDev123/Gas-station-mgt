import { axiosUnToken } from "@/lib/axiosInstance";
import { IRegisterSchema, RegisterSchema } from "@/lib/zod/RegisterSchema";
import { AxiosErrorHandler } from "@/utils/axiosErrorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useRegister() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  // console.log(errors);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (variable: Omit<IRegisterSchema, "confirmPassword">) => {
      try {
        const req = await axiosUnToken({
          method: "POST",
          url: "auth/register",
          data: variable,
        });
        return req.data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("something went wrong");
      }
    },
  });

  const onSubmit: SubmitHandler<IRegisterSchema> = async (data) => {
    // console.log(data);
    const payload: Omit<IRegisterSchema, "confirmPassword"> = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    mutate(payload, {
      onSuccess: (data) => {
        // console.log(data);
        toast.success("User register successful");
        setTimeout(() => navigate("/auth?auth_type=login"), 1000);
        return;
      },

      onError: (error) => {
        const errorMsg = AxiosErrorHandler(error);
        console.log(errorMsg);
        alert(errorMsg);
        toast.error(errorMsg);
        return;
      },
    });
  };
  return {
    // mutate,
    isPending,
    isError,
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}

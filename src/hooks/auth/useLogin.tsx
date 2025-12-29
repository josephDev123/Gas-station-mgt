import { axiosUnToken } from "@/lib/axiosInstance";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/slices/User";
import { ILoginSchemaSchema, loginSchema } from "@/lib/zod/loginSchema";
import { AxiosErrorHandler } from "@/utils/axiosErrorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [remember, setRemember] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ILoginSchemaSchema>({ resolver: zodResolver(loginSchema) });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (variable: ILoginSchemaSchema) => {
      try {
        const req = await axiosUnToken({
          method: "POST",
          url: "auth/login",
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

  const onSubmit: SubmitHandler<ILoginSchemaSchema> = async (data) => {
    const payload: ILoginSchemaSchema = {
      email: data.email,
      password: data.password,
    };
    mutate(payload, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("User login successful");
        dispatch(setUser(data.data));
        if (!remember) {
          localStorage.removeItem("rememberMeData");
        } else {
          localStorage.setItem(
            "rememberMeData",
            JSON.stringify({
              email: data.data.email,
              password: payload.password,
            })
          );
        }

        setTimeout(() => navigate("/"), 1000);
      },

      onError: (error) => {
        // console.log(error);
        const errorMsg = AxiosErrorHandler(error);
        console.log(errorMsg);
        // alert(errorMsg);
        toast.error(errorMsg);

        return;
      },
    });
  };

  useEffect(() => {
    // const stored = localStorage.getItem("rememberMe");
    // const rememberMe = stored ? JSON.parse(stored) : false;
    // setRemember(rememberMe);

    //set the remember me data
    const storedRememberMeData = localStorage.getItem("rememberMeData");
    const rememberMeResult: {
      password?: string;
      email?: string;
    } | null = storedRememberMeData ? JSON.parse(storedRememberMeData) : null;

    if (rememberMeResult?.email) {
      setValue("email", rememberMeResult.email);
    }

    if (rememberMeResult?.password) {
      setValue("password", rememberMeResult.password);
    }

    if (rememberMeResult?.email && rememberMeResult?.password) {
      setRemember(true);
    }
  }, []);

  const HandleRememberMe = () => {
    const rememberCurrent = !remember;
    setRemember(rememberCurrent);
    // alert(rememberCurrent);
    // localStorage.setItem("rememberMe", JSON.stringify(rememberCurrent));
  };

  return {
    HandleRememberMe,
    // setRemember,
    remember,
    // isError,
    isPending,
    register,
    handleSubmit,
    onSubmit,
    // setValue,
    errors,
  };
}

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export const useMutateAction = <TData, TVariables>(
  method: "post" | "put",
  url: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (data: TVariables) => {
      try {
        const response = await axiosInstance[method]<TData>(url, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      //   toast.success("Operation successful...");
      //   if (options?.onSuccess) {
      //     options.onSuccess(data);
      //   }
    },
    onError: (error) => {
      //   toast.error(error.message);
      //   if (options?.onError) {
      //     options.onError(error);
      //   }
    },
    ...options,
  });
};
// zibixe@mailinator.com

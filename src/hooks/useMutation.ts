import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosErrorHandler } from "@/utils/axiosErrorHandler";

export const useMutateAction = <TData, TVariables>(
  method: "post" | "put" | "delete" | "put",
  url: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  const { mutate, isPending, isError, error, data } = useMutation<
    TData,
    Error,
    TVariables
  >({
    mutationFn: async (data: TVariables) => {
      try {
        const response = await axiosInstance[method]<TData>(url, data);
        return response.data;
      } catch (error) {
        // throw error;
        const errorMsg = AxiosErrorHandler(error);
        throw new Error(errorMsg);
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

  return { mutate, isPending, isError, error, data };
};
// zibixe@mailinator.com

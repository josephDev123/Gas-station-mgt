// import axiosInstance from "@/lib/axiosInstance";
// import { AxiosErrorHandler } from "@/utils/axiosErrorHandler";
// import { useMutation } from "@tanstack/react-query";

// export function useCreateFuelAction() {
//   const { mutate, isError, error, isPending, data } = useMutation({
//     mutationKey: ["createFuel"],
//     mutationFn: async (input) => {
//       try {
//         const response = await axiosInstance({
//           method: "POST",
//           url: "fuel/create",
//         });

//         const result = await response.data;
//         return result.data;
//       } catch (error) {
//         const errorMsg = AxiosErrorHandler(error);
//         throw new Error(errorMsg);
//       }
//     },
//   });

//   return { mutate, isError, error, isPending, data };
// }

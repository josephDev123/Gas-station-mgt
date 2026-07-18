import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export function useFuelPump(page: number = 1, limit = 10) {
  const query = useQuery({
    queryKey: ["fuel", page],
    queryFn: async () => {
      const response = await axiosInstance(
        `fuel/find?page=${1}&limit=${limit}`,
      );
      return response.data;
    },
  });

  const pumpQuery = useQuery({
    queryKey: ["pump", page],
    queryFn: async () => {
      const response = await axiosInstance(
        `pump/find?page=${1}&limit=${limit}`,
      );
      return response.data;
    },
  });

  return { query, pumpQuery };
}

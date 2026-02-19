import { useQuery } from "@tanstack/react-query";
import { type ApiResponse } from "../types/IDashboard";
import axiosInstance from "@/lib/axiosInstance";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function useDashboardData() {
  const [searchParams] = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryKey = ["dashboard", from, to];

  const fetchDashboard = async (): Promise<ApiResponse> => {
    try {
      const params: Record<string, string> = {};

      if (from) params.from = from;
      if (to) params.to = to;

      const response = await axiosInstance.get<ApiResponse>("/dashboard", {
        params,
      });

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(
          err.response?.data?.msg || err.message || "Failed to fetch dashboard",
        );
      }
      throw err;
    }
  };

  return useQuery<ApiResponse, Error>({
    queryKey,
    queryFn: fetchDashboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes (cache time)
    retry: 1, // retry once on failure
    // refetchOnWindowFocus: false, // optional: prevent auto-refetch on focus
  });
}

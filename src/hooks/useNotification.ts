import { Notification } from "@/api/dashboard/getNotification";
import { useQuery } from "@tanstack/react-query";

export function useNotification() {
  const notification = useQuery({
    queryKey: ["notification"],
    queryFn: Notification,
  });

  return { notification };
}

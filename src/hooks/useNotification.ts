import {
  Notification,
  NotificationAction,
} from "@/api/dashboard/getNotification";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useNotification() {
  const notification = useQuery({
    queryKey: ["notification"],
    queryFn: Notification,
    refetchIntervalInBackground: true,
    refetchInterval: (query) => {
      // Stop polling once the job finishes
      if (query.state.status === "success") return false;
      return 2_000;
    },
  });

  const NotificationMutation = useMutation({
    mutationKey: ["mark-notification-read"],
    mutationFn: (data: { notificationId: number; userId: number }[]) =>
      NotificationAction(data),
  });

  return { notification, NotificationMutation };
}

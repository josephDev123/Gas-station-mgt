import axiosInstance from "@/lib/axiosInstance";
import { type INotificationApiResponse } from "@/types/dashboard/INotification";

export async function Notification() {
  const res =
    await axiosInstance.get<INotificationApiResponse>("/notification");
  return res.data;
}

export async function NotificationAction(
  data: { notificationId: number; userId: number }[],
) {
  const res = await axiosInstance.post("/notification/mark-seen-all", data);
  return res.data;
}

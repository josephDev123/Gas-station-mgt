import axiosInstance from "@/lib/axiosInstance";
import { type INotificationApiResponse } from "@/types/dashboard/INotification";

export async function Notification() {
  const res =
    await axiosInstance.get<INotificationApiResponse>("/notification");
  return res.data;
}

export async function NotificationAction() {
  const res = await axiosInstance.patch("/notification/mark-seen-all");
  return res.data;
}

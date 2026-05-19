import axiosInstance from "@/lib/axiosInstance";
import { type INotificationApiResponse } from "@/types/dashboard/INotification";

export async function Notification() {
  const res = await axiosInstance.get("/notification");
  return res.data as INotificationApiResponse;
}

export async function NotificationAction() {
  const res = await axiosInstance.patch("/notification/mark-seen-all");
  return res.data;
}

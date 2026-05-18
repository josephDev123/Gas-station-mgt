import axiosInstance from "@/lib/axiosInstance";
import { type INotificationApiResponse } from "@/types/dashboard/INotification";

export async function Notification() {
  const res =
    await axiosInstance.get<INotificationApiResponse[]>("/notification");
  return res.data;
}

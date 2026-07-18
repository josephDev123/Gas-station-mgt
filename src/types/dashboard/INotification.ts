import { number } from "zod";

export enum NotificationType {
  LOW_FUEL = "LOW_FUEL",
  FUEL_EMPTY = "FUEL_EMPTY",
  ABNORMAL_FUEL_DROP = "ABNORMAL_FUEL_DROP",

  LARGE_SALE = "LARGE_SALE",
  SALES_SUMMARY = "SALES_SUMMARY",
  SALE_FAILED = "SALE_FAILED",

  PUMP_INACTIVE = "PUMP_INACTIVE",
  PUMP_MAINTENANCE = "PUMP_MAINTENANCE",

  NOZZLE_FAULTY = "NOZZLE_FAULTY",
  NOZZLE_INACTIVE = "NOZZLE_INACTIVE",

  USER_ASSIGNED = "USER_ASSIGNED",
  NO_ATTENDANT = "NO_ATTENDANT",

  USER_ASSIGNED_NOZZLE = "USER_ASSIGNED_NOZZLE",

  HIGH_EXPENSE = "HIGH_EXPENSE",
  EXPENSE_NO_RECEIPT = "EXPENSE_NO_RECEIPT",

  SYSTEM_ALERT = "SYSTEM_ALERT",
}

export enum NotificationChannel {
  IN_APP = "IN_APP",
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export type FromUser = {
  id: number;
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "USER" | string;
  createdAt: string;
  updatedAt: string;
};

export type IReadNotification = {
  id: number;
  notificationId: number;
  userId: number;
  readAt: string;
  updatedAt: string;
};

export type Notification = {
  id: number;

  userId: number;

  fromId?: number | null;

  whoReceiveIt?: number | null;

  isGlobal: boolean;

  type: NotificationType;

  title: string;

  message: string;

  metadata?: Record<string, any> | null;

  isRead: boolean;

  readAt?: string | Date | null;

  channel: NotificationChannel;

  createdAt: string | Date;

  updatedAt: string | Date;

  from?: FromUser;
  user?: FromUser;
  readNotification: IReadNotification[];
};

export type INotificationApiResponse = {
  msg: string;
  data: Notification[];
};

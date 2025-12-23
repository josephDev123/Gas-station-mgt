export type NozzleStatus = "ACTIVE" | "INACTIVE";

export type UserRole = "ATTENDANT" | "ADMIN" | "MANAGER";

export interface Nozzle {
  id: number;
  name: string;
  status: NozzleStatus;
  pumpId: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface NozzleToUser {
  id: number;
  nozzle_id: number;
  user_id: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  nozzle: Nozzle | null;
  user: User | null;
}

export interface NozzleToUserResponse {
  msg: string;
  data: {
    NozzleToUser: NozzleToUser[];
    totalCount: number;
    page: number;
  };
}

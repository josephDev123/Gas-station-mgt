// Enum for user roles (common practice)
export enum UserRole {
  ATTENDANT = "ATTENDANT",
  ADMIN = "ADMIN",
}

export interface Profile {
  id: number;
  avatar: string;
  address: string;
  phone_no: string;
  user_id: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// User type
export interface User {
  id: number;
  email: string;
  name: string;
  password: string; // Hashed password
  role: UserRole;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  profile: Profile | null;
}

export interface UsersResponseData {
  Users: User[];
  totalCount: number;
  page: number;
}

// Full API response
export interface UsersApiResponse {
  msg: string;
  data: UsersResponseData;
}

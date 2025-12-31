export type IUser = {
  id: number;
  email: string;
  name: string;
  password: string;
  role: "ATTENDANT" | string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  profile: IProfile | null;
};

export type IProfile = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  address: string;
  phone_no: string;
  user_id: number;
};

export type IUsersData = {
  Users: IUser[];
  totalCount: number;
  page: number;
};

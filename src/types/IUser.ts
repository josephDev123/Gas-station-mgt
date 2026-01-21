export interface IUser {
  id: number | undefined;
  email: string;
  name: string;
  role: "ATTENDANT" | "ADMIN";
  profile: {
    id: number | undefined;
    avatar: string;
    avatarMetadata: {
      public_id: string;
    };
    address: string;
    phone_no: string;
  } | null;
}

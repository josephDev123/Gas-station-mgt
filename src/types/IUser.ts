export interface IUser {
  id: number | undefined;
  email: string;
  name: string;
  role: "ATTENDANT" | "ADMIN";
  profile: {
    id: number | undefined;
    avatar: String;
    avatarMetadata: {
      public_id: string;
    };
    address: String;
    phone_no: String;
  } | null;
}

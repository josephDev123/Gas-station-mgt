export interface IUser {
  id: number | undefined;
  email: string;
  name: string;
  role: "ATTENDANT" | "ADMIN";
  profile?: {
    id: number | undefined;
    avatar: String;
    address: String;
    phone_no: String;
  };
}

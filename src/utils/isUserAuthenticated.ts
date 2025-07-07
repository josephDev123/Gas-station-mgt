import { IUser } from "@/types/IUser";

export function isAuthenticated(user: IUser): boolean {
  return (
    user &&
    typeof user === "object" &&
    typeof user.email === "string" &&
    user.email.trim() !== "" &&
    typeof user.id === "number" &&
    user.id > 0 &&
    typeof user.name === "string" &&
    user.name.trim() !== ""
  );
}

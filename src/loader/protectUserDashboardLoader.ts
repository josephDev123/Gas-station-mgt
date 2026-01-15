import { redirect } from "react-router-dom";
import { store } from "@/lib/redux/store";
import { isAuthenticated } from "@/utils/isUserAuthenticated";
import { IUser } from "@/types/IUser";

export function protectedUserDashboard() {
  // const user = store.getState().user;
  const user = JSON.parse(localStorage.getItem("User")) as IUser;
  console.log(user);

  const isAuth = isAuthenticated(user);

  if (!user?.id || !isAuth) {
    throw redirect("/auth?auth_type=login");
  }

  return null;
}

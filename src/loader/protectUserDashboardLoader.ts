import { redirect } from "react-router-dom";
import { store } from "@/lib/redux/store";
import { isAuthenticated } from "@/utils/isUserAuthenticated";

export function protectedUserDashboard() {
  const user = store.getState().user;

  const isAuth = isAuthenticated(user);

  if (!user?.id || !isAuth) {
    throw redirect("/auth?auth_type=login");
  }

  return null;
}

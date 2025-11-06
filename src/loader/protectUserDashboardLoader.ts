import { store } from "@/lib/redux/store";
import { isAuthenticated } from "@/utils/isUserAuthenticated";
import { Navigate } from "react-router-dom";

export function protectedUserDashboard() {
  const user = store.getState().user;
  console.log(user);
  const isAuth = isAuthenticated(user);

  if (!user) {
    Navigate({ to: "/auth", state: { headingTo: "./dashboard" } });
    return;
  }
  if (!isAuth) {
    Navigate({ to: "/auth", state: { headingTo: "./dashboard" } });
    return;
  }
}

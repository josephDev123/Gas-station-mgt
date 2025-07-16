import { useAppSelector } from "@/lib/redux/hooks";
import { isAuthenticated } from "@/utils/isUserAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedUserDashboard() {
  const user = useAppSelector((state) => state.user);
  const isAuth = isAuthenticated(user);
  if (!user) {
    Navigate({ to: "/auth", state: { headingTo: "./dashboard" } });
  }

  if (!isAuth) {
    Navigate({ to: "/auth", state: { headingTo: "./dashboard" } });
  }
  return (
    <>
      <Outlet />;
    </>
  );
}

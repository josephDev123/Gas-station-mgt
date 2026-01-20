import { redirect } from "react-router-dom";
import { persistor, store } from "@/lib/redux/store";
import { isAuthenticated } from "@/utils/isUserAuthenticated";

export async function protectedUserDashboard() {
  await persistor.persist(); // Ensure persistence is initialized(resume persist)
  await persistor.flush(); // Wait until persisted state is fully loaded(write to disk)

  const state = store.getState();
  const user = state?.user;
  console.log(user);

  const isAuth = isAuthenticated(user);
  console.log(isAuth);

  if (!user?.id || !isAuth) {
    throw redirect("/auth?auth_type=login");
  }

  return null;
}

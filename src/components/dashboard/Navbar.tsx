import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu } from "lucide-react";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { images } from "@/utils/images";
import DropDownProfileAndLogoutHOC from "./DropDownProfileAndLogoutHOC";
import CustomAvatar from "../CustomAvatar";
import { unsetUser } from "@/lib/redux/slices/User";
import { useNotification } from "@/hooks/useNotification";
import { Notification } from "@/types/dashboard/INotification";

interface INavbar {
  mobileLeftPanelToggle: VoidFunction;
}
export default function Navbar({ mobileLeftPanelToggle }: INavbar) {
  const navigate = useNavigate();
  const session = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasMarkedReadOnOpen, setHasMarkedReadOnOpen] = useState(false);

  const logout = () => {
    dispatch(unsetUser());
    navigate("/");
  };

  const { notification, NotificationMutation } = useNotification();

  const notifications = useMemo<Notification[]>(
    () => notification.data?.data.flatMap((item) => item ?? []) ?? [],
    [notification.data],
  );

  console.log("notifications", notification);

  // const unreadCount = useMemo(
  //   () => notifications.filter((item) => !item.isRead).length,
  //   [notifications],
  // );
  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.readNotification.some(
            (read) => read.userId === session.id,
          ),
      ).length,
    [notifications, session.id],
  );

  console.log("unreadCount", unreadCount);

  const displayUnreadCount = isNotificationOpen ? 0 : unreadCount;

  const handleNotificationToggle = () => {
    setIsNotificationOpen((prev) => {
      const next = !prev;
      if (!next) {
        setHasMarkedReadOnOpen(false);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isNotificationOpen || hasMarkedReadOnOpen || unreadCount === 0) {
      return;
    }

    setHasMarkedReadOnOpen(true);
    NotificationMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notification"] });
      },
      onError: () => {
        setHasMarkedReadOnOpen(false);
      },
    });
  }, [
    NotificationMutation,
    hasMarkedReadOnOpen,
    isNotificationOpen,
    queryClient,
    unreadCount,
  ]);

  return (
    <section className="h-[80px] flex items-center justify-between gap-3 bg-white p-4 drop-shadow-md">
      <span className={`sm:hidden inline-flex items-center gap-2`}>
        <img src={images.logo} alt="logo" className="size-7 rounded-md" />
        <span className="font-medium text-sm sm:block hidden">GS</span>
      </span>

      <div className="flex items-center gap-4  justify-end ms-auto">
        <IoHome
          onClick={() => navigate("/")}
          className="sm:size-6 size-4 cursor-pointer"
        />
        <div className="relative">
          <button
            type="button"
            onClick={handleNotificationToggle}
            className="relative inline-flex cursor-pointer items-center justify-center hover:text-black/90"
            aria-label={`Notifications${displayUnreadCount > 0 ? `, ${displayUnreadCount} unread` : ""}`}
            aria-expanded={isNotificationOpen}
          >
            <Bell className="sm:size-6 size-4" />
            {displayUnreadCount > 0 && (
              <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow-sm">
                {displayUnreadCount > 99 ? "99+" : displayUnreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isNotificationOpen && (
              <motion.section
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="fixed left-2 right-2 top-[88px] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Notifications
                    </h3>
                    <p className="text-xs text-slate-500">
                      {notifications.length
                        ? `${notifications.length} item${notifications.length > 1 ? "s" : ""}`
                        : "No notifications yet"}
                    </p>
                  </div>
                  {NotificationMutation.isPending && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                      Marking read
                    </span>
                  )}
                </div>

                <div className="max-h-[70vh] divide-y divide-slate-100 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-10 text-center text-sm text-slate-500">
                      You are all caught up.
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <article
                        key={item.id}
                        className={`px-4 py-3 transition-colors ${item.isRead ? "bg-white" : "bg-slate-50"}`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-1 size-2.5 shrink-0 rounded-full ${item.isRead ? "bg-slate-300" : "bg-emerald-500"}`}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="truncate text-sm font-semibold text-slate-900">
                                {item.title}
                              </h4>
                              <span className="shrink-0 text-[11px] text-slate-400">
                                {new Date(item.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-1 text-sm leading-5 text-slate-600">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <span className="truncate text-ellipsis sm:max-w-40 w-24">
            {session.name}
          </span>

          {/* {dropdownElement} */}

          <DropDownProfileAndLogoutHOC logout={logout}>
            <CustomAvatar
              alt="logo"
              src={(session?.profile?.avatar || images.avatar).toString()}
              className="border-2 object-cover sm:size-10 size-6 cursor-pointer"
            />
          </DropDownProfileAndLogoutHOC>
        </div>
        <Menu
          onClick={mobileLeftPanelToggle}
          className="sm:hidden block cursor-pointer hover:bg-gray-200 p-1 rounded-full"
        />
      </div>
    </section>
  );
}

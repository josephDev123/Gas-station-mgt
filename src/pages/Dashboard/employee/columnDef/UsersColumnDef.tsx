import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../types/User";
import EditDeleteUserBtn from "../components/EditDeleteUserBtn";

export const usersColumnDef: ColumnDef<IUser>[] = [
  {
    header: "S/N",
    cell: ({ row }) => String(row.index + 1).padStart(2, "0"),
  },

  {
    header: "Profile",
    accessorKey: "profile.avatar",
    cell: ({ row }) => (
      <>
        {!row?.original?.profile?.avatar?.trim() ? (
          <div className="max-w-12 h-12 rounded-full overflow-hidden bg-gray-200 font-bold flex items-center justify-center">
            {row.original?.name.charAt(0).toUpperCase() || ""}
            {row.original?.name.charAt(1).toUpperCase() || ""}
          </div>
        ) : (
          <div className="max-w-12 h-12 rounded-full overflow-hidden">
            <img
              src={row?.original?.profile?.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </>
    ),
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="min-w-48">{row?.original?.name || "N/A"}</div>
    ),
  },

  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <div className="min-w-48">{row?.original?.email || "N/A"}</div>
    ),
  },

  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => row?.original?.role || "N/A",
  },
  {
    header: "Address",
    accessorKey: "profile.address",
    cell: ({ row }) => (
      <div className="max-w-64">{row?.original?.profile?.address || "N/A"}</div>
    ),
  },

  {
    header: "Phone Number",
    accessorKey: "profile.phone_no",
    cell: ({ row }) => row?.original?.profile?.phone_no || "N/A",
  },

  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row?.original?.createdAt);
      return (
        <div className="min-w-36">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = new Date(row?.original?.updatedAt);
      return (
        <div className="min-w-36">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </div>
      );
    },
  },

  {
    header: "Actions",
    cell: ({ row }) => <EditDeleteUserBtn row={row} />,
  },
];

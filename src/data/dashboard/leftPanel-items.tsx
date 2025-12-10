import { ReactNode } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaGasPump } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { GiFuelTank } from "react-icons/gi";
import { FaTasks } from "react-icons/fa";
import { BadgeDollarSign, Banknote } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { MdAssignment } from "react-icons/md";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

interface IleftPanel_items {
  label: string;
  link: string;
  icon: ReactNode;
}

export const leftPanel_items: IleftPanel_items[] = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <TbLayoutDashboardFilled className="size-4" />,
  },

  {
    label: "Fuel",
    link: "/dashboard/fuel",
    icon: <GiFuelTank className="size-4" />,
  },

  {
    label: "Pump",
    link: "/dashboard/pump",
    icon: <FaGasPump className="size-4" />,
  },
  {
    label: "Assign Fuel",
    link: "/dashboard/assign-fuel-to-pump",
    icon: <MdOutlineAssignmentTurnedIn className="size-4" />,
  },

  {
    label: "Assigned List",
    link: "/dashboard/assign-fuel-pump",
    icon: <MdAssignment className="size-4" />,
  },

  {
    label: "Employee",
    link: "/dashboard/employee",
    icon: <BsFillPeopleFill className="size-4" />,
  },

  {
    label: "Task",
    link: "/dashboard/task",
    icon: <FaTasks className="size-4" />,
  },
  {
    label: "Sale",
    link: "/dashboard/sale",
    icon: <BadgeDollarSign className="size-4" />,
  },

  {
    label: "Customer",
    link: "/dashboard/customer",
    icon: <IoPersonSharp className="size-4" />,
  },

  {
    label: "Expenses",
    link: "/dashboard/expenses",
    icon: <Banknote className="size-4" />,
  },

  {
    label: "Analysis",
    link: "/dashboard/analysis",
    icon: <ChartNoAxesCombined className="size-4" />,
  },
];

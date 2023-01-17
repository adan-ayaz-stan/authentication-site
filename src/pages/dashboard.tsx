import Image from "next/image";
import Link from "next/link";
import {
  AiFillAccountBook,
  AiFillCalendar,
  AiFillGift,
  AiFillHome,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai/index";
import { Tooltip } from "react-tooltip";

import logo from "@/assets/svg/logo.png";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <div className="h-screen w-20 fixed t-0 l-0 flex flex-col justify-between items-center bg-orange-500">
        {/* Logo */}
        <div className="relative h-20 w-full">
          <Image
            src={logo}
            alt="company-logo"
            fill={true}
            className="object-cover"
          />
        </div>

        {/* Routing */}
        <div className="flex flex-col gap-4">
          <div
            id="dashboard-sidebar-home"
            data-tooltip-content="Home"
            className="w-fit p-2 hover:bg-orange-400 cursor-pointer rounded-lg transition-all duration-300"
          >
            <AiFillHome className="text-3xl" />
            <Tooltip anchorId="dashboard-sidebar-home" />
          </div>
          <div
            id="dashboard-sidebar-calender"
            data-tooltip-content="Calender"
            className="w-fit p-2 hover:bg-orange-400 cursor-pointer rounded-lg transition-all duration-300"
          >
            <AiFillCalendar className="text-3xl" />
            <Tooltip anchorId="dashboard-sidebar-calender" />
          </div>
          <div
            id="dashboard-sidebar-expenses"
            data-tooltip-content="Expenses"
            className="w-fit p-2 hover:bg-orange-400 cursor-pointer rounded-lg transition-all duration-300"
          >
            <AiFillAccountBook className="text-3xl" />
            <Tooltip anchorId="dashboard-sidebar-expenses" />
          </div>
          <div
            id="dashboard-sidebar-gift"
            data-tooltip-content="Daily Reward"
            className="w-fit p-2 hover:bg-orange-400 cursor-pointer rounded-lg transition-all duration-300"
          >
            <AiFillGift className="text-3xl" />
            <Tooltip anchorId="dashboard-sidebar-gift" />
          </div>
        </div>

        {/* Log Out */}
        <div
          id="dashboard-sidebar-logout"
          data-tooltip-content="Logout"
          className="w-fit mb-6 p-2 hover:bg-orange-400 cursor-pointer rounded-lg transition-all duration-300"
        >
          <AiOutlineLogout className="text-3xl" />
          <Tooltip anchorId="dashboard-sidebar-logout" />
        </div>
      </div>
    </div>
  );
}

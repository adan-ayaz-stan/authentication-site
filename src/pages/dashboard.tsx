import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { verify } from "jsonwebtoken";
import { doc, getDoc } from "firebase/firestore";
import {
  AiFillAccountBook,
  AiFillCalendar,
  AiFillGift,
  AiFillHome,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai/index";
import { firestore } from "firebase.config";
import { Tooltip } from "react-tooltip";

import logo from "@/assets/svg/logo.png";
import router from "next/router";

interface pageProps {
  userData: {
    name: String;
    email: String;
  };
}

const Dashboard: NextPage<pageProps> = ({ userData }) => {
  const logout = async () => {
    const data = await fetch("/api/logout").then((data) => data.json());
    if (data.status == "success") {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/9536008/pexels-photo-9536008.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=1')]">
      {/* Sidebar */}
      <div className="h-fit sm:h-screen w-screen sm:w-20 fixed bottom-0 sm:top-0 left-0 flex flex-row sm:flex-col justify-center sm:justify-between items-center py-2 sm:py-0 bg-orange-500 bg-opacity-50">
        {/* Logo */}
        <div className="relative hidden sm:block h-20 w-full">
          <Image
            src={logo}
            alt="company-logo"
            fill={true}
            className="object-cover"
          />
        </div>

        {/* Routing */}
        <div className="flex flex-row sm:flex-col gap-4">
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
          className="w-fit ml-2 sm:mb-6 p-2 hover:bg-orange-400 cursor-pointer rounded-lg transition-all duration-300"
          onClick={logout}
        >
          <AiOutlineLogout className="text-3xl" />
          <Tooltip anchorId="dashboard-sidebar-logout" />
        </div>
      </div>

      {/* MAIN PANEL */}
      <div className="relative sm:pl-20 text-black">
        <h2 className="w-full text-xl text-gray-700 text-center font-medium uppercase p-4">
          Your dashboard
        </h2>

        <div className="m-4 p-4 bg-black bg-opacity-10 rounded-xl backdrop-blur-md">
          <p>Hey there {userData.name}.</p>
          <p>
            Your current email is <code>{userData.email}</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const cookie = context.req.cookies.usrdt;
    const validate = verify(cookie, "wepreachbeneaththestars");
    console.log(validate);
    const ref = doc(firestore, "users", `${validate}`);
    const data = await getDoc(ref);
    if (data.exists()) {
      return {
        props: {
          userData: data.data(),
        },
      };
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default Dashboard;

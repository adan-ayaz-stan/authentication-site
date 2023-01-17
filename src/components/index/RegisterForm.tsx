import Link from "next/link";
import { motion } from "framer-motion";

import {
  AiOutlineApple,
  AiOutlineFacebook,
  AiOutlineGooglePlus,
} from "react-icons/ai/index";

export default function RegisterForm() {
  return (
    <motion.div
      className="min-h-screen h-fit flex flex-col text-black justify-center px-8 lg:px-16 gap-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.5,
        type: "keyframes",
        ease: "easeOut",
      }}
    >
      <h1 className="text-3xl font-bold">Register</h1>
      <h2 className="text-gray-700">
        Have an amazing time using our services.
      </h2>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Full Name</label>
          <input
            type="text"
            className="p-3 bg-gray-100 border-none focus:ring-1 focus:ring-orange-500 rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Email Address</label>
          <input
            type="text"
            className="p-3 bg-gray-100 border-none focus:ring-1 focus:ring-orange-500 rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="text"
            className="p-3 bg-gray-100 border-none focus:ring-1 focus:ring-orange-500 rounded-xl"
          />
        </div>

        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            className="rounded checked:text-orange-500 focus:ring-orange-500"
          />
          <label className="text-sm">
            I agree with Terms of Service, Terms Of Payments and Privacy Policy.
          </label>
        </div>

        <button
          type="submit"
          className="p-3 text-black font-normal non-italic text-white bg-orange-500 rounded-xl uppercase"
        >
          Register
        </button>
      </form>

      <p className="w-full text-center">OR</p>

      <div className="grid grid-cols-6 grid-rows-1 gap-4">
        <Link
          href="/"
          className="col-span-2 flex flex-row items-center justify-center p-2 text-white bg-[#af2121] rounded-xl"
        >
          <AiOutlineGooglePlus className="text-3xl" />
        </Link>
        <Link
          href="/"
          className="col-span-2 flex flex-row items-center justify-center p-2 text-white bg-[#3b5998] rounded-xl"
        >
          <AiOutlineFacebook className="text-3xl" />
        </Link>
        <Link
          href="/"
          className="col-span-2 flex flex-row items-center justify-center p-2 text-white bg-[#132133] hover:shadow-2xl rounded-xl"
        >
          <AiOutlineApple className="text-3xl" />
        </Link>
      </div>
    </motion.div>
  );
}

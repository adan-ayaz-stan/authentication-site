import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import LoginForm from "@/components/index/LoginForm";

import logo from "../assets/svg/logo.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen h-fit bg-white grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
        {/* LEFT SIDE */}
        <div className="min-h-screen relative p-3 lg:rounded-tr-[5em] lg:rounded-br-[5em] rounded-none text-center lg:text-left bg-[url('https://images.pexels.com/photos/11719086/pexels-photo-11719086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-cover">
          <div className="h-full w-full flex flex-col justify-between p-12 text-black rounded-[3em]">
            <motion.div
              className="relative t-0 h-[120px] md:h-[200px]"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                type: "keyframes",
                ease: "easeOut",
              }}
            >
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  fill={true}
                  className="m-auto object-cover"
                />
              </Link>
            </motion.div>
            <div className="font-['Montserrat'] font-medium">
              <motion.span
                className="block text-3xl my-2 font-['Montserrat'] font-bold"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 1,
                  type: "keyframes",
                  ease: "easeOut",
                }}
                style={{ textShadow: "1px 1px 3px #fff" }}
              >
                Welcome to Company
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 1.3,
                  type: "keyframes",
                  ease: "easeOut",
                }}
                style={{ textShadow: "1px 1px 3px #fff" }}
              >
                We're a Digital Agency. We are glad to see you again! <br /> Get
                access to your Orders, Wishlist and Recommendations.
              </motion.span>
            </div>
            <motion.div
              className="font-['Montserrat']"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: 1.8,
                type: "keyframes",
                ease: "easeOut",
              }}
            >
              <p>Don't have an account?</p>
              <Link href="/register" className="font-bold hover:underline">
                Register Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <LoginForm />
      </main>
    </>
  );
}

import { useRouter } from "next/router";
import { useState } from "react";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";

import {
  AiOutlineApple,
  AiOutlineFacebook,
  AiOutlineGooglePlus,
} from "react-icons/ai/index";

export default function LoginForm() {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const validate = (values: any) => {
    const errors: any = {};
    // Checking if email is valid
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      errors.email = "Invalid email address.";
    }

    // Checking if email and password fields are not empty.
    if (!values.email) {
      errors.email = "This field is required.";
    }

    if (!values.password) {
      errors.password = "This field is required.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: async (values) => {
      setProcessing(true);
      const userRegistry = {
        email: values.email,
        password: values.password,
      };
      const data = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegistry),
      }).then((data) => data.json());
      if (data.status == "failed") {
        console.log(data);
        if (data.type === "password") {
          formik.errors.password = data.message;
        } else {
          formik.errors.email = data.message;
        }
        setProcessing(false);
      } else if (data.status == "success") {
        router.replace("/dashboard");
      }
    },
  });

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
      <h1 className="text-3xl font-bold">Login</h1>
      <h2 className="text-gray-700">Try out our amazing services.</h2>

      <form
        onSubmit={formik.handleSubmit}
        id="login-form"
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            className="p-3 bg-gray-100 border-none focus:ring-1 focus:ring-orange-500 rounded-xl"
          />
          <AnimatePresence>
            {formik.errors.email && (
              <motion.p
                className="text-red-700"
                initial={{ opacity: 0, height: "0px" }}
                animate={{ opacity: 1, height: "fit-content" }}
                exit={{ opacity: 0, height: "0px" }}
                transition={{
                  duration: 0.4,
                  type: "keyframes",
                  ease: "easeOut",
                }}
              >
                {formik.errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            className="p-3 bg-gray-100 border-none focus:ring-1 focus:ring-orange-500 rounded-xl"
          />
          <AnimatePresence>
            {formik.errors.password && (
              <motion.p
                className="text-red-700"
                initial={{ opacity: 0, height: "0px" }}
                animate={{ opacity: 1, height: "fit-content" }}
                exit={{ opacity: 0, height: "0px" }}
                transition={{
                  duration: 0.4,
                  type: "keyframes",
                  ease: "easeOut",
                }}
              >
                {formik.errors.password}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Link href={"/"} className="text-orange-500 font-bold hover:underline">
          Forgot password
        </Link>

        {processing ? (
          <p className="bg-green-500 text-white px-2 py-3 text-center rounded-xl">
            Processing...
          </p>
        ) : (
          <button
            type="submit"
            className="p-3 text-black font-normal non-italic text-white bg-orange-500 rounded-xl uppercase"
          >
            Register
          </button>
        )}
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

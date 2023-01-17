import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import {
  AiOutlineApple,
  AiOutlineFacebook,
  AiOutlineGooglePlus,
} from "react-icons/ai/index";

export default function RegisterForm() {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = "This field is required.";
    } else if (values.name.length > 21) {
      errors.name = "Must be 21 characters or less";
    }

    if (!values.password) {
      errors.password = "This field is required.";
    } else if (values.password.length > 25) {
      errors.password = "Must be 20 characters or less";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    }

    if (!values.email) {
      errors.email = "This field is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.checkbox) {
      errors.checkbox = "This is required.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      checkbox: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: async (values) => {
      setProcessing(true);
      const userRegistry = {
        email: values.email,
        name: values.name.trim(),
        password: values.password,
      };
      const data = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegistry),
      }).then((data) => data.json());
      if (data.status == "failed") {
        formik.errors.email = "Records already exist.";
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
      <h1 className="text-3xl font-bold">Register</h1>
      <h2 className="text-gray-700">
        Have an amazing time using our services.
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        id="register-form"
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => formik.handleChange(e)}
            className="p-3 bg-gray-100 border-none focus:ring-1 focus:ring-orange-500 rounded-xl"
          />
          <AnimatePresence>
            {formik.errors.name && (
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
                {formik.errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-2">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            onChange={(e) => formik.handleChange(e)}
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
            onChange={(e) => formik.handleChange(e)}
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

        <div className="flex flex-row gap-2">
          <input
            type="checkbox"
            name="checkbox"
            onChange={(e) => formik.handleChange(e)}
            className="rounded checked:text-orange-500 focus:ring-orange-500"
          />
          <label
            className="text-sm"
            style={formik.errors.checkbox ? { color: "red" } : {}}
          >
            I agree with Terms of Service, Terms Of Payments and Privacy Policy.
          </label>
        </div>

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

import { setCookie } from "cookies-next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase.config";
import * as jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  const ref = doc(firestore, "users", req.body.email);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const userData = docSnap.data();
    bcrypt.compare(
      req.body.password,
      userData.password,
      function (err: any, result: any) {
        if (result === true) {
          setCookie(
            "usrdt",
            jwt.sign(userData.email, "wepreachbeneaththestars"),
            {
              req,
              res,
              httpOnly: true,
              secure: true,
              maxAge: 60 * 60 * 7,
              sameSite: "lax",
            }
          );
          res.status(200).json({
            status: "success",
          });
        } else if (result === false) {
          res.status(200).json({
            message: "Records do not match.",
            status: "failed",
            type: "password",
          });
        }
      }
    );
  } else {
    res.status(200).json({
      message: "No records found.",
      status: "failed",
      type: "email",
    });
  }
}

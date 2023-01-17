import { setCookie } from "cookies-next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../firebase.config";
import * as jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  bcrypt.hash(req.body.password, 10, async function (err: any, hash: any) {
    // Store hash in your password DB.
    console.log(hash, err);
    const ref = doc(firestore, "users", req.body.email);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      res.status(200).json({
        message: "User already exists.",
        status: "failed",
      });
    } else {
      await setDoc(ref, {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      // setCookie("scrt", jwt.sign("secretout", "wepreachbeneaththestars"), {
      //   req,
      //   res,
      //   httpOnly: true,
      //   maxAge: 15,
      //   secure: true,
      //   sameSite: "lax",
      // });
      res.status(200).json({
        message: "Creation successful.",
        status: "success",
      });
    }
  });
}

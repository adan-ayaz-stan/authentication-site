import { setCookie } from "cookies-next";
import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  setCookie("pscdaprvl", jwt.sign("crash", "wepreachbeneaththestars"), {
    req,
    res,
    httpOnly: true,
    maxAge: 30,
    secure: true,
    sameSite: "lax",
  });
  res.status(200).json({
    name: "success",
  });
}

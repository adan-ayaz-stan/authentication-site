import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie } from "cookies-next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie("usrdt", {
    req,
    res,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 7,
  });
  res.status(200).json({
    status: "success",
  });
}

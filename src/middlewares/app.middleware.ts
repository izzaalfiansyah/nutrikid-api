import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { authSecret, AuthService } from "../services/auth.service";

export async function appMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const appkey = req.headers["x-app-key"];
  const secret = process.env.APP_KEY || "1234";

  if (appkey != secret) {
    res.status(403).json({
      status: 403,
      message: "Access Forbidden",
    });

    return;
  }

  const token = req.headers["authorization"]?.replace("Bearer ", "");

  try {
    const payload: any = verify(token as string, authSecret);
    const id = payload.id;

    const user = await AuthService.userRepository.findOneByOrFail({ id });

    req.user = user;
  } catch (err) {
    //do nothing
  }

  next();
}

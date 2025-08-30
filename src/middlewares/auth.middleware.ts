import { Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: Function,
) {
  if ((req as any).user) {
    next();
    return;
  }

  res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
}

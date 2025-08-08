import { Request, Response } from "express";
import { data_source } from "../modules/data-source.module";
import { User } from "../entities/user.entity";
import { PasswordService } from "./password.service";
import { sign } from "jsonwebtoken";

export const authSecret = "itsauthsecret";

export class AuthService {
  static async login(req: Request, res: Response) {
    try {
      const params = req.body;

      const userRepository = data_source.getRepository(User);
      const user = await userRepository
        .createQueryBuilder("users")
        .addSelect("users.password")
        .where("users.username = :username", {
          username: params.username,
        })
        .getOne();

      if (!user) {
        throw "user tidak ditemukan";
      }

      const is_valid = await PasswordService.verify(
        params.password,
        user.password,
      );

      if (!is_valid) {
        throw "password salah";
      }

      const access_token = sign({ id: user.id }, authSecret, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      const refresh_token = sign({ id: user.id }, authSecret, {
        expiresIn: 60 * 60 * 24 * 30,
      });

      res.json({
        success: true,
        message: "berhasil login",
        data: {
          access_token,
          refresh_token,
        },
      });
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }
  }

  static async profile(req: Request, res: Response) {
    const profile = req.user;

    res.json({
      success: true,
      data: profile,
    });
  }
}

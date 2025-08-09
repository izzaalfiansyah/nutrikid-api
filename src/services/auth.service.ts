import { Request, Response } from "express";
import { PasswordService } from "./password.service";
import { sign, verify } from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";

export const authSecret = "itsauthsecret";

export class AuthService {
  static async login(req: Request, res: Response) {
    try {
      const params = req.body;

      const user = await userRepository()
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

  static async updateProfile(req: Request, res: Response) {
    try {
      const params = req.body;

      const user = await userRepository().findOneByOrFail({
        id: req.user?.id as number,
      });

      user.name = params.name;
      user.phone = params.phone;

      await userRepository().save(user);

      res.json({
        success: true,
        message: "Berhasil mengedit profil",
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Gagal mengedit profil",
      });
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      const params = req.body;

      const user = await userRepository().findOneByOrFail({
        id: req.user?.id as number,
      });

      user.password = await PasswordService.generate(params.password);

      await userRepository().save(user);

      res.json({
        success: true,
        message: "Berhasil mengedit password",
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Gagal mengedit password",
      });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const payload: any = verify(req.body.refresh_token, authSecret);

      const user = await userRepository().findOneByOrFail({
        id: payload.id,
      });

      if (!user) {
        throw "user tidak ditemukan";
      }

      const access_token = sign({ id: user.id }, authSecret, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      const refresh_token = sign({ id: user.id }, authSecret, {
        expiresIn: 60 * 60 * 24 * 30,
      });

      res.json({
        success: true,
        message: "Berhasil melakukan refresh token ",
        data: {
          access_token,
          refresh_token,
        },
      });
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Refresh token gagal",
      });
    }
  }
}

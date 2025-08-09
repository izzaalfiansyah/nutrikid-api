import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { userRepository } from "../repositories/user.repository";
import { PasswordService } from "./password.service";
import { School } from "../entities/school.entity";
import { schoolRepository } from "../repositories/school.repository";

export class UserService {
  static async getAll(req: Request, res: Response) {
    let users: Array<User> = [];
    let total = 0;

    try {
      const params = req.params;

      const query = userRepository()
        .createQueryBuilder("users")
        .where("users.deleted_at is null");

      if (params.role) {
        query.where("users.role = :role", { role: params.role });
      }

      if (params.search) {
        query.where("users.name like :search or users.username like :search", {
          search: `%${params.search}%`,
        });
      }

      total = await query.getCount();

      const limit: any = params.limit || 20;
      const page: any = params.page || 1;
      const skip = limit * (page - 1);

      users = await query.take(limit).skip(skip).getMany();
    } catch (err) {
      // do nothing
    }

    res.json({
      success: true,
      message: "Berhasil mengambil data pengguna",
      data: {
        users,
      },
    });
  }

  static async store(req: Request, res: Response) {
    try {
      const params = req.body;

      const user = new User();
      user.name = params.name;
      user.phone = params.phone;
      user.username = params.username;
      user.password = await PasswordService.generate(params.password);
      user.role = params.role;

      if (params.school_id) {
        user.school = await schoolRepository().findOneByOrFail({
          id: params.school_id,
        });
      }

      await userRepository().save(user);

      res.json({
        success: true,
        message: "Pengguna berhasil ditambah",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Pengguna gagal ditambah",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const params = req.body;

      const user = await userRepository().findOneByOrFail({
        id: req.params.id as any,
      });
      user.name = params.name;
      user.phone = params.phone;
      user.username = params.username;
      user.role = params.role;

      await userRepository().save(user);

      res.json({
        success: true,
        message: "Pengguna berhasil diedit",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Pengguna gagal diedit",
      });
    }
  }
}

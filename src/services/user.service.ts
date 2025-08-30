import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { userRepository } from "../repositories/user.repository";
import { PasswordService } from "./password.service";
import { schoolRepository } from "../repositories/school.repository";

export class UserService {
  static async getAll(req: Request, res: Response) {
    let users: Array<User> = [];
    let total = 0;

    try {
      const params = req.query;

      let query = userRepository()
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.school", "school")
        .orderBy("users.name", "ASC")
        .where("users.deleted_at is null");

      if (params.role) {
        query = query.where("users.role = :role", { role: params.role });
      }

      let school_id: any = params.school_id;

      if (!school_id && (req as any).user?.role != "admin") {
        school_id = (req as any).user?.school?.id;
      }

      if (school_id) {
        query = query.where("users.school_id = :school_id", {
          school_id,
        });
      }

      if (params.search) {
        query = query.where(
          "users.name like :search or users.username like :search",
          {
            search: `%${params.search}%`,
          },
        );
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
        total,
        users,
      },
    });
  }

  static async show(req: Request, res: Response) {
    try {
      const user = await userRepository().findOneByOrFail({
        id: req.params.id as any,
      });

      res.json({
        success: true,
        message: "Berhasil mengambil data pengguna",
        data: {
          user,
        },
      });
    } catch (err) {
      res.status(400).json({
        succes: false,
        message: "User tidak ditemukan",
      });
    }
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
      res.status(422).json({
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
      res.status(422).json({
        success: false,
        message: "Pengguna gagal diedit",
      });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const user = await userRepository().findOneByOrFail({
        id: req.params.id as any,
      });

      user.deleted_at = new Date();

      await userRepository().save(user);

      res.json({
        success: true,
        message: "Pengguna berhasil dihapus",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Pengguna gagal dihapus",
      });
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      if ((req as any).user?.role != "admin" && (req as any).user?.id != (req.params.id as any)) {
        throw "Dont't have permission";
      }

      const params = req.body;
      const id = req.params.id as any;

      const user = await userRepository().findOneByOrFail({
        id,
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
}

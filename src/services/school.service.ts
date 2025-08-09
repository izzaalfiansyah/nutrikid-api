import { Entity } from "typeorm";
import { schoolRepository } from "../repositories/school.repository";
import { Request, Response } from "express";
import { School } from "../entities/school.entity";

@Entity()
export class SchoolService {
  static async getAll(req: Request, res: Response) {
    try {
      const result = await schoolRepository().find({});

      res.json({
        success: true,
        message: "Berhasil mengambil data sekolah",
        data: {
          school: result,
        },
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Gagal mengambil data sekolah",
      });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const name = req.body.name;

      const school: School = {
        name,
      } as any;

      await schoolRepository().save(school);

      res.json({
        success: true,
        message: "Sekolah berhasil ditambah",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Sekolah gagal ditambah",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = req.params.id as any;
      const name = req.body.name;

      const school = await schoolRepository().findOneByOrFail({ id });

      school.name = name;

      await schoolRepository().save(school);

      res.json({
        success: true,
        message: "Sekolah berhasil diedit",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Sekolah gagal diedit",
      });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const id = req.params.id as any;

      await schoolRepository().delete({ id });

      res.json({
        success: true,
        message: "Sekolah berhasil dihapus",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Gagal menghapus sekolah",
      });
    }
  }
}

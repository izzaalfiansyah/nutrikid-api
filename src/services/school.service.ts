import { Entity } from "typeorm";
import { schoolRepository } from "../repositories/school.repository";
import { Request, Response } from "express";
import { School } from "../entities/school.entity";

@Entity()
export class SchoolService {
  static async getAll(req: Request, res: Response) {
    let schools: Array<School> = [];

    try {
      const result = await schoolRepository().find({
        where: { deleted_at: null as any },
      });
      schools = result;
    } catch (err) {
      // do nothing
    }

    res.json({
      success: true,
      message: "Berhasil mengambil data sekolah",
      data: {
        schools,
      },
    });
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
      res.status(422).json({
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
      res.status(422).json({
        success: false,
        message: "Sekolah gagal diedit",
      });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const id = req.params.id as any;

      const school = await schoolRepository().findOneByOrFail({ id });

      school.deleted_at = new Date();

      await schoolRepository().save(school);

      res.json({
        success: true,
        message: "Sekolah berhasil dihapus",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Gagal menghapus sekolah",
      });
    }
  }
}

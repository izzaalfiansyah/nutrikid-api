import { Request, Response } from "express";
import { Student } from "../entities/student.entity";
import { studentRepository } from "../repositories/student.repository";
import { schoolRepository } from "../repositories/school.repository";

export class StudentService {
  static async getAll(req: Request, res: Response) {
    let students: Array<Student> = [];
    let total = 0;

    try {
      const query = studentRepository().createQueryBuilder("students");

      query.where("students.deleted_at is null");

      const params = req.query;

      if (params.school_id) {
        query.where("students.school_id = :school_id", {
          school_id: params.school_id,
        });
      }

      if (params.gender) {
        query.where("students.gender = :gender", { gender: params.gender });
      }

      if (params.search) {
        query.where("students.name like :search", {
          search: `%${params.search}%`,
        });
      }

      total = await query.getCount();

      students = await query.getMany();
    } catch (err) {
      // do nothing
    }

    res.json({
      success: true,
      message: "Berhasil mengambil data siswa",
      data: {
        students,
      },
    });
  }

  static async store(req: Request, res: Response) {
    try {
      const school = await schoolRepository().findOneByOrFail({
        id: req.body.school_id,
      });

      const student: Student = {
        nisn: req.body.nisn,
        name: req.body.name,
        gender: req.body.gender,
        school,
        birth_date: req.body.birth_date,
      } as any;

      await studentRepository().save(student);

      res.json({
        success: true,
        message: "Siswa berhasil ditambahkan",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Siswa gagal ditambahkan",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const student = await studentRepository().findOneByOrFail({
        id: req.params.id as any,
      });

      student.name = req.body.name;
      student.gender = req.body.gender;
      student.birth_date = req.body.birth_date;

      await studentRepository().save(student);

      res.json({
        success: true,
        message: "Siswa berhasil diedit",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Siswa gagal diedit",
      });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const student = await studentRepository().delete({
        id: req.params.id as any,
      });

      res.json({
        success: true,
        message: "Siswa berhasil dihapus",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Siswa gagal dihapus",
      });
    }
  }
}

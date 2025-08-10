import { Request, Response } from "express";
import { Student } from "../entities/student.entity";
import { studentRepository } from "../repositories/student.repository";
import { schoolRepository } from "../repositories/school.repository";
import moment from "moment";
import { measurementRepository } from "../repositories/measurement.repository";

export class StudentService {
  static async getAll(req: Request, res: Response) {
    let students: Array<Student> = [];
    let total = 0;

    try {
      const query = studentRepository()
        .createQueryBuilder("students")
        .leftJoinAndSelect("students.school", "school")
        .orderBy("students.nisn", "ASC")
        .where("students.deleted_at is null");

      const params = req.query;
      let school_id: any = params.school_id;

      if (!school_id && req.user?.role != "admin") {
        school_id = req.user?.school?.id;
      }

      if (school_id) {
        query.where("students.school_id = :school_id", {
          school_id,
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

      const limit: any = params.limit || 20;
      const page: any = params.page || 1;
      const skip = limit * (page - 1);

      students = await query.take(limit).skip(skip).getMany();
    } catch (err) {
      // do nothing
    }

    students = students.map((student) => {
      return student.toJson();
    });

    res.json({
      success: true,
      message: "Berhasil mengambil data siswa",
      data: {
        students,
      },
    });
  }

  static async show(req: Request, res: Response) {
    try {
      const student = await studentRepository().findOneByOrFail({
        id: req.params.id as any,
      });

      const measurement = await measurementRepository()
        .createQueryBuilder("measurements")
        .where("measurements.student_id = :student_id", {
          student_id: student.id,
        })
        .orderBy("created_at", "DESC")
        .orderBy("id", "DESC")
        .limit(1)
        .getOne();

      if (measurement) {
        student.measurement = measurement;
      }

      res.json({
        success: true,
        message: "Berhasil mengambil data siswa",
        data: {
          student: student.toJson(),
        },
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Siswa tidak ditemukan",
      });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const school = await schoolRepository().findOneByOrFail({
        id: req.body.school_id,
      });

      const student = new Student();
      student.nisn = req.body.nisn;
      student.name = req.body.name;
      student.gender = req.body.gender;
      student.birth_date = moment(req.body.birth_date).toDate();
      student.school = school;

      await studentRepository().save(student);

      res.json({
        success: true,
        message: "Siswa berhasil ditambahkan",
      });
    } catch (err) {
      res.status(422).json({
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
      student.birth_date = moment(req.body.birth_date).toDate();

      await studentRepository().save(student);

      res.json({
        success: true,
        message: "Siswa berhasil diedit",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Siswa gagal diedit",
      });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const student = await studentRepository().findOneByOrFail({
        id: req.params.id as any,
      });

      student.deleted_at = new Date();

      await studentRepository().save(student);

      res.json({
        success: true,
        message: "Siswa berhasil dihapus",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Siswa gagal dihapus",
      });
    }
  }
}

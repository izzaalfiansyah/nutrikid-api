import { Request, Response } from "express";
import { Measurement } from "../entities/measurement.entity";
import { measurementRepository } from "../repositories/measurement.repository";
import { calculateResult } from "../utils/calculate-result.utils";
import { studentRepository } from "../repositories/student.repository";
import {
  female_z_scores,
  male_z_scores,
} from "../utils/calculate-z-score.utils";

export class MeasurementService {
  static async getAll(req: Request, res: Response) {
    let measurements: Array<Measurement> = [];
    let total = 0;

    try {
      const query = measurementRepository()
        .createQueryBuilder("measurements")
        .leftJoinAndSelect("measurements.student", "student")
        .orderBy("measurements.created_at", "DESC")
        .where("measurements.deleted_at is null");

      const params = req.query;

      if (params.student_id) {
        query.where("measurements.student_id = :student_id", {
          student_id: params.student_id,
        });
      }

      let school_id: any = params.school_id;

      if (!school_id && req.user?.role != "admin") {
        school_id = req.user?.school?.id;
      }

      if (school_id) {
        query.where("student.school_id = :school_id", {
          school_id: school_id,
        });
      }

      if (params.start_date) {
        query.where("measurements.created_at >= :start_date", {
          start_date: params.start_date,
        });
      }

      if (params.end_date) {
        query.where("measurements.created_at <= :end_date", {
          end_date: params.end_date,
        });
      }

      total = await query.getCount();

      const limit: any = params.limit || 20;
      const page: any = params.page || 1;
      const skip = limit * (page - 1);

      measurements = await query.take(limit).skip(skip).getMany();
    } catch (err) {
      // do nothing
    }

    measurements = measurements.map((m) => m.toJson());

    res.json({
      success: true,
      message: "Berhasil mengambil data pengukuran",
      data: {
        total,
        measurements,
      },
    });
  }

  static async show(req: Request, res: Response) {
    try {
      const measurement = await measurementRepository().findOneByOrFail({
        id: req.params.id as any,
      });

      res.json({
        success: true,
        message: "Berhasil mengambil data pengukuran",
        data: {
          measurement: measurement.toJson(),
        },
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Data pengukuran tidak ditemukan",
      });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const params = req.body;
      const student = await studentRepository().findOneByOrFail({
        id: params.student_id,
      });

      const { bmi, height, weight, age, age_month } = calculateResult({
        height: params.student_height,
        weight: params.student_weight,
        birth_date: student.birth_date,
        gender: student.gender,
        created_at: req.body.created_at,
      });

      const measurement = new Measurement();

      measurement.student = student;
      measurement.student_age = age;
      measurement.student_age_month = age_month;
      measurement.student_height = height;
      measurement.student_weight = weight;
      measurement.student_bmi = bmi;
      measurement.creator = req.user!;

      if (params.created_at) {
        measurement.created_at = params.created_at;
      }

      await measurementRepository().save(measurement);

      res.json({
        success: true,
        message: "Data pengukuran berhasil ditambah",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Data pengukuran gagal ditambah",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const params = req.body;
      const id = req.params.id as any;

      const measurement = await measurementRepository().findOneOrFail({
        where: { id },
        relations: ["student"],
      });

      const { bmi, height, weight } = calculateResult({
        height: params.student_height,
        weight: params.student_weight,
        birth_date: measurement.student.birth_date,
        gender: measurement.student.gender,
        created_at: req.body.created_at,
      });

      measurement.student_height = height;
      measurement.student_weight = weight;
      measurement.student_bmi = bmi;

      await measurementRepository().save(measurement);

      res.json({
        success: true,
        message: "Data pengukuran berhasil diedit",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Data pengukuran gagal diedit",
      });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const measurement = await measurementRepository().findOneByOrFail({
        id: req.params.id as any,
      });

      measurement.deleted_at = new Date();

      await measurementRepository().save(measurement);

      res.json({
        success: true,
        message: "Data pengukuran berhasil dihapus",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Data pengukuran gagal dihapus",
      });
    }
  }

  static async calculate(req: Request, res: Response) {
    try {
      const result = calculateResult({
        height: req.body.height,
        weight: req.body.weight,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
        created_at: req.body.created_at,
      });

      res.json({
        success: true,
        message: "Berhasil menghitung status kesehatan",
        data: {
          ...result,
        },
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Gagal menghitung status kesehatan",
      });
    }
  }

  static async getDefaultZScore(req: Request, res: Response) {
    const gender = req.query.gender as any;

    if (!gender) {
      res.status(422).json({
        success: false,
        message: "Gender tidak diketahui",
      });
    }

    const z_scores = gender == "l" ? male_z_scores : female_z_scores;

    return res.json({
      success: true,
      message: "Berhasil mengambil z score",
      data: {
        z_scores,
      },
    });
  }
}

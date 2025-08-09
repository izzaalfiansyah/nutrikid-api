import { Request, Response } from "express";
import { Measurement } from "../entities/measurement.entity";
import { measurementRepository } from "../repositories/measurement.repository";
import { schoolRepository } from "../repositories/school.repository";
import { calculateBmi } from "../utils/calculate-bmi.utils";

export class MeasurementService {
  static async getAll(req: Request, res: Response) {
    let measurements: Array<Measurement> = [];
    let total = 0;

    try {
      const query = measurementRepository()
        .createQueryBuilder("measurements")
        .select("measurements.*")
        .leftJoin("students", "student", "student.id = measurements.student_id")
        .where("measurements.deleted_at != NULL");

      const params = req.params;

      if (params.student_id) {
        query.where("measurements.student_id = :student_id", {
          student_id: params.student_id,
        });
      }

      if (params.school_id) {
        query.where("student.school_id = :school_id", {
          school_id: params.school_id,
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
          measurement,
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
      const student = await schoolRepository().findOneByOrFail({
        id: params.student_id,
      });

      const { bmi, height, weight } = calculateBmi({
        height: params.student_height,
        weight: params.student_weight,
      });

      const measurement: Measurement = {
        student: student as any,
        student_height: height,
        student_weight: weight,
        student_bmi: bmi,
        creator: req.user,
      } as any;

      await measurementRepository().save(measurement);

      res.json({
        success: true,
        message: "Data pengukuran berhasil ditambah",
      });
    } catch (err) {
      res.status(402).json({
        success: false,
        message: "Data pengukuran gagal ditambah",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const params = req.body;
      const id = req.params.id as any;

      const { bmi, height, weight } = calculateBmi({
        height: params.student_height,
        weight: params.student_weight,
      });

      const measurement = await measurementRepository().findOneByOrFail({ id });

      measurement.student_height = height;
      measurement.student_weight = weight;
      measurement.student_bmi = bmi;

      await measurementRepository().save(measurement);

      res.json({
        success: true,
        message: "Data pengukuran berhasil diedit",
      });
    } catch (err) {
      res.status(402).json({
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
      res.status(402).json({
        success: false,
        message: "Data pengukuran gagal dihapus",
      });
    }
  }
}

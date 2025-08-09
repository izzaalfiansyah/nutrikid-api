import { Request, Response } from "express";
import { MeasurementSuggestion } from "../entities/measurement_suggestion.entity";
import { measurementSuggestionRepository } from "../repositories/measurement_suggestion.repository";
import { measurementRepository } from "../repositories/measurement.repository";

export class MeasurementSuggestionService {
  static async getAll(req: Request, res: Response) {
    let suggestions: Array<MeasurementSuggestion> = [];
    let total = 0;

    try {
      const params = req.query;
      const query = measurementSuggestionRepository()
        .createQueryBuilder("suggestions")
        .leftJoinAndSelect("suggestions.creator", "creator");

      const measurement_id = params?.measurement_id || req.body?.measurement_id;

      if (measurement_id) {
        query.where("suggestions.measurement_id = :measurement_id", {
          measurement_id,
        });
      }

      total = await query.getCount();

      const limit: any = params.limit || 20;
      const page: any = params.page || 1;
      const skip = limit * (page - 1);

      suggestions = await query.take(limit).skip(skip).getMany();
    } catch (err) {
      // do nothing
    }

    res.json({
      success: true,
      message: "Berhasil mengambil data saran",
      data: {
        total,
        suggestions,
      },
    });
  }

  static async store(req: Request, res: Response) {
    try {
      const suggestion = new MeasurementSuggestion();
      const measurement = await measurementRepository().findOneByOrFail({
        id: req.params?.measurement_id || req.body?.measurement_id,
      });

      suggestion.advice = req.body.advice;
      suggestion.creator = req.user!;
      suggestion.measurement = measurement;

      await measurementSuggestionRepository().save(suggestion);

      res.json({
        success: true,
        message: "Saran berhasil ditambah",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Saran gagal ditambah",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const suggestion =
        await measurementSuggestionRepository().findOneByOrFail({
          id: req.params.id as any,
        });

      suggestion.advice = req.body.advice;

      await measurementSuggestionRepository().save(suggestion);

      res.json({
        success: true,
        message: "Saran berhasil diedit",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Saran gagal diedit",
      });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      await measurementSuggestionRepository().delete({
        id: req.params.id as any,
      });

      res.json({
        success: true,
        message: "Saran berhasil dihapus",
      });
    } catch (err) {
      res.status(422).json({
        success: false,
        message: "Saran gagal dihapus",
      });
    }
  }
}

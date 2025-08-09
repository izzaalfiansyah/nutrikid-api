import { Router } from "express";
import { MeasurementService } from "../services/measurement.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { measurement_suggestion_router } from "./measurement_suggestion.router";

const measurement_router = Router();

measurement_router
  .get("/", MeasurementService.getAll)
  .post("/", authMiddleware, MeasurementService.store)
  .get("/:id", MeasurementService.show)
  .put("/:id", authMiddleware, MeasurementService.update)
  .delete("/:id", authMiddleware, MeasurementService.destroy)
  .use("/:measurement_id/suggestion", measurement_suggestion_router);

export { measurement_router };

import { Router } from "express";
import { MeasurementService } from "../services/measurement.service";

const measurement_router = Router();

measurement_router
  .get("/", MeasurementService.getAll)
  .post("/", MeasurementService.store)
  .get("/:id", MeasurementService.show)
  .put("/:id", MeasurementService.update)
  .delete("/:id", MeasurementService.destroy);

export { measurement_router };

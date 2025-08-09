import { Router } from "express";
import { MeasurementSuggestionService } from "../services/measurement_suggestion.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const measurement_suggestion_router = Router();

measurement_suggestion_router
  .get("/", MeasurementSuggestionService.getAll)
  .post("/", authMiddleware, MeasurementSuggestionService.store)
  .put("/:id", authMiddleware, MeasurementSuggestionService.update)
  .delete("/:id", MeasurementSuggestionService.destroy);

export { measurement_suggestion_router };

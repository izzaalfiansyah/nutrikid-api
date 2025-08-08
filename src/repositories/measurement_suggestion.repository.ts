import { MeasurementSuggestion } from "../entities/measurement_suggestion.entity";
import { data_source } from "../modules/data-source.module";

export const measurementSuggestionRepository = () =>
  data_source.getRepository(MeasurementSuggestion);

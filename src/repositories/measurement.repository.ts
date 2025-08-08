import { Measurement } from "../entities/measurement.entity";
import { data_source } from "../modules/data-source.module";

export const measurementRepository = () =>
  data_source.getRepository(Measurement);

import { School } from "../entities/school.entity";
import { data_source } from "../modules/data-source.module";

export const schoolRepository = () => data_source.getRepository(School);

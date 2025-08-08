import { Student } from "../entities/student.entity";
import { data_source } from "../modules/data-source.module";

export const studentRepository = () => data_source.getRepository(Student);

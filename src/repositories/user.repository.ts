import { User } from "../entities/user.entity";
import { data_source } from "../modules/data-source.module";

export const userRepository = () => data_source.getRepository(User);

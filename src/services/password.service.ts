import { compare, hash } from "bcrypt";

export class PasswordService {
  static async generate(password: string) {
    return await hash(password, 12);
  }

  static async verify(password: string, hash: string) {
    return await compare(password, hash);
  }
}

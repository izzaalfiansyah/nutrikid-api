import "reflect-metadata";
import { DataSource } from "typeorm";

export const data_source = new DataSource({
  type: "mysql",
  host: (process.env as any).DB_HOST || "localhost",
  port: 3306,
  username: (process.env as any).DB_USER || "root",
  password: (process.env as any).DB_PASSWORD,
  database: (process.env as any).DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["src/entities/**/*.entity.ts"],
  subscribers: [],
  migrations: [],
});

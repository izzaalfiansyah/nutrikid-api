import "reflect-metadata";
import "dotenv/config";

import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { data_source } from "./modules/data-source.module";
import { router } from "./router";

async function bootstrap() {
  const app = express();
  const port = (process.env as any).APP_PORT || 5000;

  try {
    await data_source.initialize();

    app.use(cors());
    app.use(express.json());
    app.use(router);

    const server = createServer(app);

    server.listen(port, () => {
      console.log("server running on http://localhost:" + port);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();

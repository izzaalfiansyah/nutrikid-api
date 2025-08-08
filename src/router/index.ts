import { Router } from "express";
import { auth_router } from "./auth.router";
import { data_source } from "../modules/data-source.module";
import { User } from "../entities/user.entity";
import { PasswordService } from "../services/password.service";
import { appMiddleware } from "../middlewares/app.middleware";

const router = Router().use(appMiddleware);

router.get("/", async (_, res) => {
  const userRepository = data_source.getRepository(User);
  const user = await userRepository.findOneBy({ id: 1 });

  if (!user) {
    const password = await PasswordService.generate("superadmin");
    const newUser: User = {
      id: 1,
      username: "superadmin",
      password,
      name: "Mas Admin",
      phone: "081231921351",
      role: "admin",
    };

    await userRepository.save(newUser);
  }

  res.json({
    hello: "World",
  });
});

router.use("/", auth_router);

export { router };

import { Router } from "express";
import { auth_router } from "./auth.router";
import { User } from "../entities/user.entity";
import { PasswordService } from "../services/password.service";
import { appMiddleware } from "../middlewares/app.middleware";
import { userRepository } from "../repositories/user.repository";
import { school_router } from "./school.router";

const router = Router().use(appMiddleware);

router.get("/", async (_, res) => {
  const user = await userRepository().findOneBy({ id: 1 });

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

    await userRepository().save(newUser);
  }

  res.json({
    hello: "World",
  });
});

router.use("/", auth_router);
router.use("/school", school_router);

export { router };

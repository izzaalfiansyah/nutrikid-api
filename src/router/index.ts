import { Router } from "express";
import { auth_router } from "./auth.router";
import { User } from "../entities/user.entity";
import { PasswordService } from "../services/password.service";
import { appMiddleware } from "../middlewares/app.middleware";
import { userRepository } from "../repositories/user.repository";
import { school_router } from "./school.router";
import { student_router } from "./student.router";
import { measurement_router } from "./measurement.router";
import { user_router } from "./user.router";
import { measurement_suggestion_router } from "./measurement_suggestion.router";
import { MeasurementService } from "../services/measurement.service";

const router = Router().use(appMiddleware);

router.get("/", async (_, res) => {
  const id = 1;
  const user = await userRepository().findOneBy({ id });

  if (!user) {
    const password = await PasswordService.generate("superadmin");
    const newUser: User = {
      id,
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
    app: {
      name: process.env.APP_NAME,
      description: process.env.APP_DESCRIPTION,
    },
  });
});

router.use("/", auth_router);
router.use("/user", user_router);
router.use("/school", school_router);
router.use("/student", student_router);
router.use("/measurement", measurement_router);
router.use("/measurement-suggestion", measurement_suggestion_router);
router.post("/calculate", MeasurementService.calculate);

export { router };

import { Router } from "express";
import { AuthService } from "../services/auth.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const auth_router = Router();

auth_router.post("/login", AuthService.login);

auth_router
  .use(authMiddleware)
  .get("/profile", AuthService.profile)
  .post("/profile", AuthService.updateProfile)
  .post("/profile/change-password", AuthService.changePassword)
  .post("/refresh-token", AuthService.refreshToken);

export { auth_router };

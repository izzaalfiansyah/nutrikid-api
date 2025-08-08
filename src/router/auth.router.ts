import { Router } from "express";
import { AuthService } from "../services/auth.service";
import { authMiddleware } from "../middlewares/auth.middleware";

const auth_router = Router();

auth_router.post("/login", AuthService.login);
auth_router.use(authMiddleware).get("/profile", AuthService.profile);

export { auth_router };

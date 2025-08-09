import { Router } from "express";
import { UserService } from "../services/user.service";

const user_router = Router();

user_router
  .get("/", UserService.getAll)
  .post("/", UserService.store)
  .put("/:id", UserService.update)
  .delete("/:id", UserService.destroy)
  .post("/change-password", UserService.changePassword);

export { user_router };

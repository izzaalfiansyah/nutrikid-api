import { Router } from "express";
import { StudentService } from "../services/student.service";

const student_router = Router();

student_router
  .get("/", StudentService.getAll)
  .post("/", StudentService.store)
  .put("/:id", StudentService.update)
  .delete("/:id", StudentService.destroy);

export { student_router };

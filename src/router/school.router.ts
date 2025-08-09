import { Router } from "express";
import { SchoolService } from "../services/school.service";

const school_router = Router();

school_router
  .get("/", SchoolService.getAll)
  .post("/", SchoolService.store)
  .put("/:id", SchoolService.update)
  .delete("/:id", SchoolService.destroy);

export { school_router };

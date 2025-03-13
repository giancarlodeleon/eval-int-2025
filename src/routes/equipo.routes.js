import { Router } from "express";
import {
  getEquipos,
  createEquipos,
  getEquipo,
  updateEquipos,
  deleteEquipos,
} from "../controllers/equipo.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { EquipoSchema } from "../schemas/equipo.schema.js";

const router = Router();

router.get("/equipos", getEquipos);
router.get("/equipos/:id", getEquipo);
router.post("/equipos",validateSchema(EquipoSchema), createEquipos);
router.delete("/equipos/:id", deleteEquipos);
router.put("/equipos/:id",validateSchema(EquipoSchema), updateEquipos);

export default router;
import { Router } from "express";
import {
  getTipo_equipos,
  createTipo_equipos,
  getTipo_equipo,
  updateTipo_equipos,
  deleteTipo_equipos,
} from "../controllers/tipo_equipo.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { Tipo_equipoSchema } from "../schemas/tipo_equipo.schema.js";

const router = Router();

router.get("/tipo_equipos", getTipo_equipos);
router.get("/tipo_equipos/:id", getTipo_equipo);
router.post("/tipo_equipos",validateSchema(Tipo_equipoSchema), createTipo_equipos);
router.delete("/tipo_equipos/:id", deleteTipo_equipos);
router.put("/tipo_equipos/:id",validateSchema(Tipo_equipoSchema), updateTipo_equipos);

export default router;
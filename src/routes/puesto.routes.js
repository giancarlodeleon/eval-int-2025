import { Router } from "express";
import {
  getPuestos,
  createPuestos,
  getPuesto,
  updatePuestos,
  deletePuestos,
} from "../controllers/puesto.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { PuestoSchema } from "../schemas/puesto.schema.js";

const router = Router();

router.get("/puestos", getPuestos);
router.get("/puestos/:id", getPuesto);
router.post("/puestos",validateSchema(PuestoSchema), createPuestos);
router.delete("/puestos/:id", deletePuestos);
router.put("/puestos/:id",validateSchema(PuestoSchema), updatePuestos);

export default router;
import { Router } from "express";
import {
  getMarcas,
  createMarcas,
  getMarca,
  updateMarcas,
  deleteMarcas,
} from "../controllers/marca.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { MarcaSchema } from "../schemas/marca.schema.js";

const router = Router();

router.get("/marcas", getMarcas);
router.get("/marcas/:id", getMarca);
router.post("/marcas",validateSchema(MarcaSchema), createMarcas);
router.delete("/marcas/:id", deleteMarcas);
router.put("/marcas/:id",validateSchema(MarcaSchema), updateMarcas);

export default router;
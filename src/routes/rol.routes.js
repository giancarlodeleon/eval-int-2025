import { Router } from "express";
import {
  getRols,
  createRols,
  getRol,
  updateRols,
  deleteRols,
} from "../controllers/rol.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { RolSchema } from "../schemas/rol.schema.js";

const router = Router();

router.get("/rols", getRols);
router.get("/rols/:id", getRol);
router.post("/rols",validateSchema(RolSchema), createRols);
router.delete("/rols/:id", deleteRols);
router.put("/rols/:id",validateSchema(RolSchema), updateRols);

export default router;
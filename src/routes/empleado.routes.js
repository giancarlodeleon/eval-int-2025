import { Router } from "express";
import {
  getEmpleados,
  createEmpleados,
  getEmpleado,
  updateEmpleados,
  deleteEmpleados,
} from "../controllers/empleado.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { EmpleadoSchema } from "../schemas/empleado.schema.js";

const router = Router();

router.get("/empleados", getEmpleados);
router.get("/empleados/:id", getEmpleado);
router.post("/empleados",validateSchema(EmpleadoSchema), createEmpleados);
router.delete("/empleados/:id", deleteEmpleados);
router.put("/empleados/:id",validateSchema(EmpleadoSchema), updateEmpleados);

export default router;
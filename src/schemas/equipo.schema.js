import { z } from "zod";

export const EquipoSchema = z.object({
  no_serie: z.string({
    required_error: "No_serie is required",
  }),

  marca: z.string({
    required_error: "Marca is required",
  }),
 
  descripcion: z.string({
    required_error: "Descripcion is required",
  }),

  precio: z.number({
    required_error: "Preciu=o is required",
  }),

  tipo_equipo: z.string({
    required_error: "Tipo_equipo is required",
  }),

  empleado_id: z.string({
    required_error: "Empleado_id is required",
  }),

  date: z.string().datetime().optional(),
});

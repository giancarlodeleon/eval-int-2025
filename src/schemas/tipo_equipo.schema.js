import { z } from "zod";

export const Tipo_equipoSchema = z.object({
  nombre: z.string({
    required_error: "Tipo de equipo is required",
  }),
 
  date: z.string().datetime().optional(),
});

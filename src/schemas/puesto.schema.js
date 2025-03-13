import { z } from "zod";

export const PuestoSchema = z.object({
  puesto: z.string({
    required_error: "Puesto is required",
  }),
 
  date: z.string().datetime().optional(),
});

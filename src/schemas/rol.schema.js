import { z } from "zod";

export const RolSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
 
  descripcion: z.string({
    required_error: "Descripcion is required",
  }),
 
  date: z.string().datetime().optional(),
});

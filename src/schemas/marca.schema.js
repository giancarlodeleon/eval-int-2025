import { z } from "zod";

export const MarcaSchema = z.object({
  marca: z.string({
    required_error: "Marca is required",
  }),
 
  date: z.string().datetime().optional(),
});

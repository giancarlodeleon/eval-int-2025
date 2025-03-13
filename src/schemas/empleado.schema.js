import { z } from "zod";

export const EmpleadoSchema = z.object({
  nombre: z.string({
    required_error: "Nombre is required",
  }),

  apellido: z.string({
    required_error: "Apellido is required",
  }),
 
  telefono: z.number({
    required_error: "Telefono is required",
  }),

  puesto: z.string({
    required_error: "Puesto is required",
  }),

  fecha_nac: z.string({
    required_error: "Tipo_equipo is required",
  }),

  usuario: z.string({
    required_error: "Usuario is required",
  }),


  date: z.string().datetime().optional(),
});

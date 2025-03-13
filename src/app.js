import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/user.routes.js";
import rolRoutes from "./routes/rol.routes.js";
import marcaRoutes from "./routes/marca.routes.js";
import puestoRoutes from "./routes/puesto.routes.js";
import tipo_equipoRoutes from "./routes/tipo_equipo.routes.js";
import equipoRoutes from "./routes/equipo.routes.js";
import empleadoRoutes from "./routes/empleado.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

app.use("/api", usersRoutes);
app.use("/api", rolRoutes);
app.use("/api", marcaRoutes);
app.use("/api", puestoRoutes);
app.use("/api", equipoRoutes);
app.use("/api", empleadoRoutes);
app.use("/api", tipo_equipoRoutes);

export default app;

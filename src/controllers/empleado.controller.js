import Empleado from "../models/empleado.model.js";

export const getEmpleados = async (req, res) => {
  try {
    const empleado = await Empleado.find();
    res.json(empleado);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createEmpleados = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      telefono,
      puesto,
      fecha_nac,
      usuario,
      date,
    } = req.body;
    const newEmpleado = new Empleado({
      nombre,
      apellido,
      telefono,
      puesto,
      fecha_nac,
      usuario,
      date,
    });
    const savedEmpleado = await newEmpleado.save();
    res.json(savedEmpleado);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ message: "Empleado not found" });
    res.json(empleado);
  } catch (error) {
    return res.status(404).json({ message: "Empleado not found" });
  }
};

export const deleteEmpleados = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) return res.status(404).json({ message: "Empleado not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Empleado not found" });
  }
};

export const updateEmpleados = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!empleado) return res.status(404).json({ message: "Empleado not found" });
    res.json(empleado);
  } catch (error) {
    return res.status(404).json({ message: "Empleado not found" });
  }
};

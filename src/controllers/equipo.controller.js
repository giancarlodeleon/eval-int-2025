import Equipo from "../models/equipo.model.js";

export const getEquipos = async (req, res) => {
  try {
    const equipo = await Equipo.find();
    res.json(equipo);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createEquipos = async (req, res) => {
  try {
    const {
      no_serie,
      marca,
      descripcion,
      precio,
      tipo_equipo,
      empleado_id,
      date,
    } = req.body;
    const newEquipo = new Equipo({
      no_serie,
      marca,
      descripcion,
      precio,
      tipo_equipo,
      empleado_id,
      date,
    });
    const savedEquipo = await newEquipo.save();
    res.json(savedEquipo);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.findById(req.params.id);
    if (!equipo) return res.status(404).json({ message: "Equipo not found" });
    res.json(equipo);
  } catch (error) {
    return res.status(404).json({ message: "Equipo not found" });
  }
};

export const deleteEquipos = async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo) return res.status(404).json({ message: "Equipo not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Equipo not found" });
  }
};

export const updateEquipos = async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!equipo) return res.status(404).json({ message: "Equipo not found" });
    res.json(equipo);
  } catch (error) {
    return res.status(404).json({ message: "Equipo not found" });
  }
};

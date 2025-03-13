import Tipo_equipo from "../models/tipo_equipo.model.js";

export const getTipo_equipos = async (req, res) => {
  try {
    const tipo_equipo = await Tipo_equipo.find();
    res.json(tipo_equipo);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createTipo_equipos = async (req, res) => {
  try {
    const { nombre, date } = req.body;
    const newTipo_equipo = new Tipo_equipo({
      nombre,
      date,
    });
    const savedTipo_equipo = await newTipo_equipo.save();
    res.json(savedTipo_equipo);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getTipo_equipo = async (req, res) => {
  try {
    const tipo_equipo = await Tipo_equipo.findById(req.params.id);
    if (!tipo_equipo) return res.status(404).json({ message: "Tipo_equipo not found" });
    res.json(tipo_equipo);
  } catch (error) {
    return res.status(404).json({ message: "Tipo_equipo not found" });
  }
};

export const deleteTipo_equipos = async (req, res) => {
  try {
    const tipo_equipo = await Tipo_equipo.findByIdAndDelete(req.params.id);
    if (!tipo_equipo) return res.status(404).json({ message: "Tipo_equipo not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Tipo_equipo not found" });
  }
};

export const updateTipo_equipos = async (req, res) => {
  try {
    const tipo_equipo = await Tipo_equipo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tipo_equipo) return res.status(404).json({ message: "Tipo_equipo not found" });
    res.json(tipo_equipo);
  } catch (error) {
    return res.status(404).json({ message: "Tipo_equipo not found" });
  }
};

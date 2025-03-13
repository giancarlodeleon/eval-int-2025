import Puesto from "../models/puesto.model.js";

export const getPuestos = async (req, res) => {
  try {
    const puestos = await Puesto.find();
    res.json(puestos);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createPuestos = async (req, res) => {
  try {
    const { puesto, date } = req.body;
    const newPuesto = new Puesto({
      puesto,
      date,
    });
    const savedPuesto = await newPuesto.save();
    res.json(savedPuesto);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getPuesto = async (req, res) => {
  try {
    const puesto = await Puesto.findById(req.params.id);
    if (!puesto) return res.status(404).json({ message: "Puesto not found" });
    res.json(puesto);
  } catch (error) {
    return res.status(404).json({ message: "Puesto not found" });
  }
};

export const deletePuestos = async (req, res) => {
  try {
    const puesto = await Puesto.findByIdAndDelete(req.params.id);
    if (!puesto) return res.status(404).json({ message: "Puesto not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Puesto not found" });
  }
};

export const updatePuestos = async (req, res) => {
  try {
    const puesto = await Puesto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!puesto) return res.status(404).json({ message: "Puesto not found" });
    res.json(puesto);
  } catch (error) {
    return res.status(404).json({ message: "Puesto not found" });
  }
};

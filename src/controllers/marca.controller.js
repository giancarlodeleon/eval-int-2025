import Marca from "../models/marca.model.js";

export const getMarcas = async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.json(marcas);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const createMarcas = async (req, res) => {
  try {
    const { marca, date } = req.body;
    const newMarca = new Marca({
      marca,
      date,
    });
    const savedMarca = await newMarca.save();
    res.json(savedMarca);
  } catch (error) {
    return res.status(500).json({ message: "Something went Wrong" });
  }
};

export const getMarca = async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.id);
    if (!marca) return res.status(404).json({ message: "Marca not found" });
    res.json(marca);
  } catch (error) {
    return res.status(404).json({ message: "Marca not found" });
  }
};

export const deleteMarcas = async (req, res) => {
  try {
    const marca = await Marca.findByIdAndDelete(req.params.id);
    if (!marca) return res.status(404).json({ message: "Marca not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Marca not found" });
  }
};

export const updateMarcas = async (req, res) => {
  try {
    const marca = await Marca.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!marca) return res.status(404).json({ message: "Marca not found" });
    res.json(marca);
  } catch (error) {
    return res.status(404).json({ message: "Marca not found" });
  }
};

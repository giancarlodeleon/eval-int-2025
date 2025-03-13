import mongoose from "mongoose";

const tipo_equipoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique:true
    },

    date: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tipo_equipo", tipo_equipoSchema);

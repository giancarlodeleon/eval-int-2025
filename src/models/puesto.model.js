import mongoose from "mongoose";

const puestoSchema = new mongoose.Schema(
  {
    puesto: {
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

export default mongoose.model("Puesto", puestoSchema);

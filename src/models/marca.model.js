import mongoose from "mongoose";

const marcaSchema = new mongoose.Schema(
  {
    marca: {
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

export default mongoose.model("Marca", marcaSchema);

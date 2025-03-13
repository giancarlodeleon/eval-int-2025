import mongoose from "mongoose";

const rolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },

    descripcion: {
      type: String,
      required: true,
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

export default mongoose.model("Rol", rolSchema);

import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true, 
    },

    apellido:{
        type: String,
        required: true,
        trim: true,
    },

    telefono:{
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
      },

    puesto:{
        type: String,
        required: true,
    },

    fecha_nac:{
        type: String,
        required: true,
    },

    usuario:{
        type: String,
        required: true,
        trim: true, 
    },

},{
    timestamps:true
})

export default mongoose.model('Empleado', empleadoSchema)
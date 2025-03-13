import mongoose from "mongoose";

const equipoSchema = new mongoose.Schema({

    no_serie:{
        type: String,
        required: true,
        trim: true,
        unique: true, 
    },

    marca:{
        type: String,
        required: true,
        trim: true,
    },

    descripcion:{
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
      },


    precio:{
        type: Number,
        required: true,
    },

    tipo_equipo:{
        type: String,
        required: true,
    },

    empleado_id:{
        type: String,
        required: true,
    },
},{
    timestamps:true
})

export default mongoose.model('Equipo', equipoSchema)
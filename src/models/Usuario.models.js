import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true,
    },
    ci: {
        type: Number,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true,
        unique: true
    },
    medidor: {
        type: String,
        required: true,
        default: 'analogico'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        required: true,
        default: 'user_rol'
    },
    imagen: {
        type: String,
    }
}, {
    timestamps: true,
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

export default model('Usuario', UsuarioSchema);
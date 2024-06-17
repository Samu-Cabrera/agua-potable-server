import { request, response } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/Usuario.models.js';

const getUsuario = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Obtener usuario'
    });
};

const usuarioPost = async (req = request, res = response) => {
    const { nombre, apellido, ci, direccion, telefono, email, password, estado, rol, imagen } = req.body;
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    const hashPassword = bcryptjs.hashSync(password, salt);

    const nuevoUsuario = new Usuario({
        nombre,
        apellido,
        ci,
        direccion,
        telefono,
        email,
        password: hashPassword,
        estado,
        rol,
        imagen
    });

    //guardar usuario en la base de datos
    await nuevoUsuario.save();
    res.status(201).json({
        ok: true,
        nuevoUsuario,
    });
};

const usuarioPut = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Editar usuario'
    });
};

const usuarioDelete = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete usuario'
    });
};

export default {
    getUsuario,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}
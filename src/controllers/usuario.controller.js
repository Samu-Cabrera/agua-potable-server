import { request, response } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/Usuario.models.js';

const getUsuario = async (req = request, res = response) => {
    const {limite = 10, desde = 0} = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
        .skip(desde)
        .limit(limite)
    ]);

    res.status(200).json({
        ok: true,
        total,
        usuarios
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

const usuarioPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, ...resto} = req.body;

    //encriptar constraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);

    //buscar y actualizar
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(400).json({
        ok: true,
        msg: 'Usuario actualizado',
        usuario
    });
};

const usuarioDelete = async (req = request, res = response) => {
    const { id } = req.params;

    const [usuario, usuarioActualizado] = await Promise.all([
        Usuario.findByIdAndUpdate(id, { estado: false }),
        Usuario.findById(id)
    ]);

    res.json({
        ok: true,
        msg: `Se seshabilitó el usuario con el id: ${ id }`,
        usuarioActualizado
    });
};

export default {
    getUsuario,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}
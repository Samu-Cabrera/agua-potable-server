import { request, response } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/Usuario.models.js';
import Rol from '../models/Roles.model.js';

const getUsuario = async (req = request, res = response) => {
    const {limite = 10, desde = 0} = req.query;

    const [total, usuarios, rol] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .populate('roles')
    ]);

    res.status(200).json({
        ok: true,
        total,
        usuarios,
        rol
    });
};

const getUsuariosDeshabilitados = async (req = request, res = response) => {
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: false }),
        Usuario.find({ estado: false }).populate('roles')
    ]);

    res.status(200).json({
        ok: true,
        msg: 'Usuarios deshabilitados',
        total,
        usuarios
    });
}

const getUsuariosAll = async (req = request, res = response) => {
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find().populate('roles')
    ]);

    res.status(200).json({
        ok: true,
        msg: 'Todos los usuarios',
        total,
        usuarios
    });
}

const getUserById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id);
        return res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener el usuario'
        });
    }
}

const usuarioPost = async (req = request, res = response) => {
    const { nombre, apellido, ci, direccion, telefono, email, password, estado, roles, imagen } = req.body;  
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
        roles,
        imagen
    });

    if(roles){
        const existeRoles = await Rol.find({ nombre: roles });
        nuevoUsuario.roles = existeRoles.map(role => role._id);
    } else {
        const role = await Rol.findOne({ nombre: 'user_rol' });
        nuevoUsuario.roles = [role._id];
    } 

    //guardar usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({
        ok: true,
        nuevoUsuario
    });
};

const usuarioPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    try {
        if(password){
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync(password, salt);
        }
        //buscar y actualizar
        const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    
        res.status(400).json({
            ok: true,
            msg: 'Usuario actualizado',
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se pudo actualizar el usuario.'
        });
    }
};

const usuarioDelete = async (req = request, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        ok: true,
        msg: 'Usuario deshabilitado',
        usuario
    });
};

export default {
    getUsuario,
    getUsuariosDeshabilitados,
    getUsuariosAll,
    getUserById,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}
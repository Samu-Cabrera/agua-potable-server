import { request, response } from 'express';
import pkg from 'jsonwebtoken';
const { verify } = pkg;
import Usuario from '../models/Usuario.models.js';

export const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { id } = verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        //verificar el usuario
        const usuario = await Usuario.findById(id);
        if(!usuario){
            return res.status(401).json({
                ok: false,
                msg: `El usuario no existe`
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                ok: false,
                msg: `El usuario no esta activo`
            });
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la validación del token'
        });
    }
}
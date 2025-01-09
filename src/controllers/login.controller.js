import { request, response } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.models.js';
import { generarJWT } from '../helpers/generar-jwt.js';
import { logAudit } from '../helpers/auditLog.js';

export const login = async (req = request, res = response) => {
    const { ci, password } = req.body;

    try {
        //verficiar si el CI existe
        const usuario = await Usuario.findOne({ ci });
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El CI no existe',
            });
        }
    
        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario esta deshabilitado',
            });
        }
    
        //verificar contraseña
        const passwordValido = bcrypt.compareSync(password, usuario.password);
        if(!passwordValido){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            })
        }
    
        //generar jwt
        const token = await generarJWT(usuario.id);

        // Registrar auditoría
        await logAudit('login', usuario._id, `Usuario inició sesión: ${usuario.nombre}`);
    
        res.status(200).json({
            ok: true,
            msg: 'Login correcto',
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Error interno del servidor'
        });
    }  
};


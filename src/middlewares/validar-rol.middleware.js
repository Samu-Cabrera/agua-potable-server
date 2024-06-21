import { request, response } from 'express';
import Roles from '../models/Roles.model.js';
import Usuario from '../models/Usuario.models.js';

export const validarRol = async (req = request, res = response, next) => {
    //si el usuarios no existe
    if(!req.usuario){
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el rol sin el token'
        });
    }

    //verificar si el usuario tiene rol de administrador
    const usuario = await Usuario.findById(req.usuario._id);
    const roles = await Roles.find({ _id: usuario.roles[0]._id });
    /* roles.forEach(role => {
        if(role.nombre === "admin_rol"){
        next();
        return;
        }
    }); */

    if(!roles[0].nombre === 'admin_rol'){
        return res.status(403).json({
            msg: 'Requiere rol de administrador para realizar esta acción'
        });
    }

    /* return res.status(403).json({
        msg: "Requiere rol de administrador para realizar esta acción",
    }); */

    next();

}
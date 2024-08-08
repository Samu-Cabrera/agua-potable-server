import Usuario from '../models/Usuario.models.js';
import Role from '../models/Roles.model.js';
import Lectura from '../models/Medidor.model.js';

export const verificarCi = async (ci) => {
    const existeCi = await Usuario.findOne({ ci });
    if(existeCi){
        throw new Error('El CI ya existe');
    }
};

export const verificarEmail = async (email) => {
    const existeEmail = await Usuario.findOne({ email });
    if(existeEmail){
        throw new Error('El email ya existe');
    }
};

export const verificarRol = async (rol) => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error('El rol no esta registrado');
    }
}

export const validarIdUsuario = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error('El usuario no existe');
    }
}

export const usuarioActivo = async (id) => {
    const usuarioActivo = await Usuario.findOne({ _id: id, estado: true });
    if(!usuarioActivo){
        throw new Error('Ya esta deshabilitado');
    } 
}

export const verificarLecturaId = async (id) => {
    const existeLectura = await Lectura.findById(id);
    if(!existeLectura){
        throw new Error('La lectura no existe');
    }
}


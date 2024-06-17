import { request, response } from 'express';

const getUsuario = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'Obtener usuario'
    });
};

const usuarioPost = (req = request, res = response) => {
    const { ...usuario } = req.body;
    
    res.json({
        ok: true,
        usuario
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
import { validationResult } from 'express-validator';
import { request, response } from 'express';

export const validarCampos = (req = request, res = response, next) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores
        });
    }
    next();
};
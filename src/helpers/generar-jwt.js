import jwt from 'jsonwebtoken';

export const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn: '48h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });
    });
};
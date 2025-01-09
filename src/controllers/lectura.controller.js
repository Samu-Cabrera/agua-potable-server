import { request, response } from 'express';
import Lectura from '../models/Medidor.model.js';
import { differenceInDays, parseISO } from 'date-fns';
import { logAudit } from '../helpers/auditLog.js';



export const getLecturaAll = async (req = request, res = response) => {
    const { userID } = req.params;

    try {

        const lecturas = await Lectura.find({ userID });

        res.status(200).json({ lecturas });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las lecturas'
        });
    }
}

export const getLecturaActual = async (req = request, res = response) => {
    const { userID } = req.params;

    try {

        const lecturas = await Lectura.find({ userID }).sort({ fechaLectura: -1 }).limit(2);
        if(lecturas.length < 2){
            return res.status(200).json({
                ok: false,
                msg: 'Ingrese una nueva lectura para realizar el cálculo.',
                consumoActual: 0,
                diferenciaEnDias: 0,
                ultimaLectura: lecturas
            });
        }

        const consumoActual = lecturas[0].lectura - lecturas[1].lectura;
        const diferenciaEnDias = differenceInDays(parseISO(lecturas[0].fechaLectura.toISOString()), parseISO(lecturas[1].fechaLectura.toISOString()));

        res.status(200).json ({
            ok: true,
            consumoActual,
            diferenciaEnDias,
            ultimaLectura: lecturas[0]
        });
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la lectura actual.'
        });
    }
}

export const lecturaPost = async (req = request, res = response) => {
    const { userID, lectura, limite, fechaLectura, fechaLimite } = req.body;
    const { _id: userId } = req.usuario;

    try {

        const nuevaLectura = await Lectura.create({
            userID,
            lectura,
            limite,
            fechaLectura,
            fechaLimite
        });

        nuevaLectura.save();

        const lecturas = await Lectura.find({ userID }).sort({ fechaLectura: -1 }).limit(2);

        // Registro en la auditoría
        await logAudit({
            user: userId,
            action: 'REGISTRO DE LECTURA',
            description: `Se registró una nueva lectura para el usuario con ID: ${userID}`,
            area: 'Lecturas de Medidores',
        });

        if(lecturas.length < 2){
            return res.status(200).json({ 
                ok: false,
                msg: 'Lectura guardada, no hay suficiente historial para calcular consumo.',
                consumoActual: 0,
                diasConsumo: 0,
                ultimaLectura: lecturas
            });
        }

        const consumoActual = lecturas[0].lectura - lecturas[1].lectura;
        const diasConsumo = differenceInDays(parseISO(lecturas[0].fechaLectura.toISOString()), parseISO(lecturas[1].fechaLectura.toISOString()));

        res.status(201).json({
            ok: true,
            consumoActual,
            diasConsumo,
            ultimaLectura: lecturas[0]
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: 'Error al guardar la lectura'
        });
    }
}

export const updateLimit = async (req = request, res = response) => {
    const { lecturaId } = req.params;
    const { _id: userId } = req.usuario;
    const { limite } = req.body;

    try {

        const ultimaLecura = await Lectura.findByIdAndUpdate(lecturaId, { limite: Number(limite), fechaLimite: new Date()  }, { new: true });

        // Registro en la auditoría
        await logAudit({
            user: userId,
            action: 'ACTUALIZACIÓN DE LÍMITE',
            description: `Se actualizó el límite de la lectura con ID: ${lecturaId}`,
            area: 'Lecturas de Medidores',
        });

        res.status(200).json({
            ok: true,
            msg: 'Límite actualizado correctamente.',
            ultimaLecura
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el limite'
        });
    }
}
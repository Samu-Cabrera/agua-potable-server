import { request, response } from 'express';
import Lectura from '../models/Medidor.model.js';
import { differenceInDays, parseISO } from 'date-fns';


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

    try {

        const nuevaLectura = await Lectura.create({
            userID,
            lectura,
            limite,
            fechaLectura,
            fechaLimite
        });

        nuevaLectura.save();

        // Registrar auditoría
        await AuditLog.create({
            action: 'create',
            user: userID,
            description: `Nueva lectura creada con lectura: ${lectura}`,
            metadata: { lectura },
        });

        const lecturas = await Lectura.find({ userID }).sort({ fechaLectura: -1 }).limit(2);

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
    const { limite } = req.body;

    try {

        const ultimaLecura = await Lectura.findByIdAndUpdate(lecturaId, { limite: Number(limite), fechaLimite: new Date()  }, { new: true });

        // Registrar auditoría
        await AuditLog.create({
            action: 'update',
            user: ultimaLecura.userID,
            description: `Límite actualizado para lectura ID: ${lecturaId}`,
            metadata: { lecturaId, nuevoLimite: limite, fechaLimite: ultimaLecura.fechaLimite },
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
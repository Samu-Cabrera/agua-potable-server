import { request, response } from 'express';
import Factura from '../models/Factura.model.js';
import { logAudit } from '../helpers/auditLog.js';

export const createFactura = async (req = request, res = response) => {
    const { userID } = req.params;
    const { cantidad, iva, precio, fechaVencimiento } = req.body;
    const { _id: userId } = req.usuario;

    try {

        const lastFactura = await Factura.findOne().sort({ nroFactura: -1 });
        const nroFactura = lastFactura ? lastFactura.nroFactura + 1 : 1;
        const cuentaTotal = (cantidad * precio) + ((cantidad * precio) * iva / 100);

        const factura = {
            userID,
            nroFactura,
            consumo: {
                cantidad,
                iva,
                precio,
            },
            fechaVencimiento,
            cuentaTotal
        };

        const nuevaFactura = new Factura(factura);

        await nuevaFactura.save();

        // Registrar en la auditoría
        await logAudit({
            user: userId,
            action: 'CREACIÓN DE FACTURA',
            description: `Factura creada para el usuario con ID: ${userID}`,
            area: 'Gestión de Facturas',
        });

        res.status(201).json({
            ok: true,
            factura: nuevaFactura
        });

    } catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear la factura'
        });
    }


}

export const getFacturaPendiente = async (req = request, res = response) => {
    const { userID } = req.params;

    try {

        const factura = await Factura.find({ userID, estadoPago: false }).populate('userID').exec();

        res.status(200).json({
            ok: true,
            factura
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener la factura'
        });
    }
}

export const getFacturaAll = async (req = request, res = response) => {
    const { userID } = req.params;

    try {

        const factura = await Factura.find({ userID }).populate('userID', 'nombre apellido ci direccion').exec();

        res.status(200).json({
            ok: true,
            factura
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener la factura'
        });
    }
}

export const getFacturaById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const factura = await Factura.findById(id).populate('userID');
        res.status(200).json(factura);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las factura'
        });
    }
}

export const getFacturas = async (req = request, res = response) => {
    try {
        const facturas = await Factura.find().populate('userID').exec();
        res.status(200).json(facturas);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las facturas'
        });
    }
}

export const updateFactura = async (req = request, res = response) => {
    const { id } = req.params;
    const body = req.body;
    const { _id: userId } = req.usuario;

    try {
 
        const factura = await Factura.findByIdAndUpdate(id, { consumo: body }).populate('userID', 'nombre apellido ci direccion').exec();

        // Registrar en la auditoría
        await logAudit({
            user: userId,
            action: 'ACTUALIZACIÓN DE FACTURA',
            description: `Factura con ID: ${id} actualizada.`,
            area: 'Gestión de Facturas',
        });

        res.status(200).json({
            ok: true,
            factura
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la factura'
        });
    }
}


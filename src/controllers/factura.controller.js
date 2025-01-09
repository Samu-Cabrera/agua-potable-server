import { request, response } from 'express';
import Factura from '../models/Factura.model.js';
import AuditLog from '../models/AuditLogs.model.js';

export const createFactura = async (req = request, res = response) => {
    const { userID } = req.params;
    const { cantidad, iva, precio, fechaVencimiento } = req.body;

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

        // Registrar auditoría
        await AuditLog.create({
            action: 'create',
            user: userID,  // El ID del usuario que creó la factura
            description: `Factura creada: N° ${nroFactura}.`,
            metadata: { nroFactura, userID, cantidad, iva, precio, fechaVencimiento, cuentaTotal },
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

    try {
 
        const factura = await Factura.findByIdAndUpdate(id, { consumo: body }).populate('userID', 'nombre apellido ci direccion').exec();
        
        // Registrar auditoría
        await AuditLog.create({
            action: 'update',
            user: factura.userID._id,
            description: `Factura actualizada: N° ${factura.nroFactura}`,
            metadata: { facturaId: id, consumo: body },
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


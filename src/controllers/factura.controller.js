import { request, response } from 'express';
import Factura from '../models/Factura.model.js';

export const createFactura = async (req = request, res = response) => {
    const { userID } = req.params;
    const { cantidad, iva, precio, fechaVencimiento, cuentaTotal } = req.body;

    try {

        const lastFactura = await Factura.findOne().sort({ nroFactura: -1 });
        const nroFactura = lastFactura ? lastFactura.nroFactura + 1 : 1;

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

        res.status(201).json({
            ok: true,
            nuevaFactura
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

        const factura = await Factura.find({ userID, estadoPago: false });

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



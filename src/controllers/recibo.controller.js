import { request, response } from 'express';
import Recibo from '../models/Recibo.model.js';
import Factura from '../models/Factura.model.js';

export const obtenerRecibos = async (req = request, res = response) => {
  try {
    const recibos = await Recibo.find()
    .populate("userID", "nombre apellido ci direccion")
    .populate("facturas");

    res.json(recibos);
  } catch (error) {
    console.error("Error al obtener recibos:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener recibos. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};

export const obtenerReciboPorId = async (req = request, res = response) => {
  const { userID } = req.params;

  try {
    const recibos = await Recibo.find({ userID })
    .populate("userID", "nombre apellido ci direccion")
    .populate("facturas");

    res.status(200).json(recibos);

  } catch (error) {
    console.error("Error al obtener recibos:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener recibos. Por favor, inténtelo de nuevo más tarde.",
    });
  }
}

export const getReciboById = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const recibos = await Recibo.find({ _id: id })
    .populate("userID", "nombre apellido ci direccion")
    .populate("facturas");

    res.status(200).json(recibos);

  } catch (error) {
    console.error("Error al obtener recibos:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener recibos. Por favor, inténtelo de nuevo más tarde.",
    });
  }
}


export const crearRecibo = async (req = request, res = response) => {
  const { userID } = req.params;
  const { servicio, formaPago, importe, tesorero } = req.body;
  
  try {
    const facturasPendientes = await Factura.find({ userID, estadoPago: false });
    const facturas = facturasPendientes.map(factura => factura._id);
    const ultimoRecibo = await Recibo.findOne().sort({ nroRecibo: -1 });
    const nroRecibo = ultimoRecibo ? ultimoRecibo.nroRecibo + 1 : 1;
    const fechaEmision = new Date();
    const total = facturasPendientes.reduce((total, factura) => total + factura.cuentaTotal, 0);

    const recibo = new Recibo({
      userID,
      nroRecibo,
      facturas,
      servicio,
      formaPago,
      importe,
      tesorero,
      fechaEmision,
      total
    });

    await recibo.save();

    await AuditLog.create({
      action: 'create',
      user: userID,
      description: `Recibo creado: N° ${nroRecibo} por un total de ${total}`,
      metadata: { 
        nroRecibo, 
        total
      },
    });

    res.status(201).json({
      recibo
    });

  } catch (error) {
    console.error('Error al crear el recibo:', error);
    res.status(500).json({ mensaje: 'Error al crear el recibo', error });
  }
};

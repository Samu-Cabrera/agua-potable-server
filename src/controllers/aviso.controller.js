import { request, response } from 'express';
import Usuario from '../models/Usuario.models.js';
import Aviso from '../models/Aviso.model.js';

export const crearAviso = async (req = request, res = response) => {
  try {
    const { mensaje, userId, leido } = req.body;

    const usuario = await Usuario.findById({_id: userId});
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const nuevoAviso = new Aviso({
      mensaje,
      usuario: userId,
      leido
    });

    await nuevoAviso.save();

    res.status(201).json(nuevoAviso);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el aviso', error: error.message });
  }
};

export const obtenerAvisos = async (req = request, res = response) => {
  try {
    const avisos = await Aviso.find()
      .populate('usuario', 'nombre apellido imagen direccion')
      .populate('respuestas.usuario', 'nombre apellido imagen direccion');
    res.json(avisos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los avisos', error: error.message });
  }
};

export const getAvisoByUserId = async (req = request, res = response) => {
  const { id } = req.params;

  try {

    const aviso = await Aviso.find({ usuario: id })
     .populate('usuario', 'nombre apellido imagen direccion')
     .populate('respuestas.usuario', 'nombre apellido imagen direccion');

    res.status(200).json(aviso);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener el aviso'
    });
  }
}

export const responderAviso = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { mensaje, usuarioId } = req.body;

    const aviso = await Aviso.findById(id);
    if (!aviso) {
      return res.status(404).json({ mensaje: 'Aviso no encontrado' });
    }

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const nuevaRespuesta = {
      mensaje,
      usuario: usuarioId,
    };

    aviso.respuestas.push(nuevaRespuesta);
    await aviso.save();

    res.status(201).json(aviso);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al responder al aviso', error: error.message });
  }
};

export const marcarComoLeido = async (req, res) => {
  try {
    const { avisoId } = req.params;
    const aviso = await Aviso.findByIdAndUpdate(avisoId, { leido: true });
    res.json(aviso);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al marcar el aviso como leído', error: error.message });
  }
};

import { request, response } from 'express';
import Reglamento from '../models/Reglamentos.model.js';
import { logAudit } from '../helpers/auditLog.js';

export const createRule = async (req = request, res = response) => {
    try {
        const { title, description } = req.body;
        const reglamento = new Reglamento({ title, description });
        await reglamento.save();

        const { _id: loggedUserId } = req.usuario;
        await logAudit({
            user: loggedUserId,
            action: 'CREACIÓN DE REGLAMENTO',
            description: `Se creó un reglamento con título: "${title}".`,
            area: 'Gestión de Reglamentos',
        });

        res.status(201).json(reglamento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRules = async (req = request, res = response) => {
    try {
        const reglamentos = await Reglamento.find();
        res.json(reglamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRule = async (req = request, res = response) => {
    try {
        const reglamento = await Reglamento.findById(req.params.id);
        if (!reglamento) {
            return res.status(404).json({ message: 'Reglamento no encontrado' });
        }
        res.json(reglamento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRule = async (req = request, res = response) => {
    try {
        const { title, description } = req.body;
        const { _id: loggedUserId } = req.usuario;
        const reglamento = await Reglamento.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        await logAudit({
            user: loggedUserId,
            action: 'ACTUALIZACIÓN DE REGLAMENTO',
            description: `Se actualizó el reglamento con ID: ${req.params.id}.`,
            area: 'Gestión de Reglamentos',
        });

        if (!reglamento) {
            return res.status(404).json({ message: 'Reglamento no encontrado' });
        }
        res.json(reglamento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRule = async (req = request, res = response) => {
    try {
        const { _id: loggedUserId } = req.usuario;
        const reglamento = await Reglamento.findByIdAndDelete(req.params.id);
        await logAudit({
            user: loggedUserId,
            action: 'ELIMINACIÓN DE REGLAMENTO',
            description: `Se eliminó el reglamento con ID: ${req.params.id}.`,
            area: 'Gestión de Reglamentos',
        });
        if (!reglamento) {
            return res.status(404).json({ message: 'Reglamento no encontrado' });
        }
        res.json({ message: 'Reglamento eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


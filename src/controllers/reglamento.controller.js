import { request, response } from 'express';
import Reglamento from '../models/Reglamentos.model.js';

export const createRule = async (req = request, res = response) => {
    try {
        const { title, description } = req.body;
        const reglamento = new Reglamento({ title, description });
        await reglamento.save();
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
        const reglamento = await Reglamento.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
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
        const reglamento = await Reglamento.findByIdAndDelete(req.params.id);
        if (!reglamento) {
            return res.status(404).json({ message: 'Reglamento no encontrado' });
        }
        res.json({ message: 'Reglamento eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


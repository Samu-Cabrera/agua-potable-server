import AuditLog from '../models/AuditLogs.model.js';

export const getAuditLogs = async (req, res) => {
    const { limit = 10, page = 1 } = req.query;

    try {
        const logs = await AuditLog.find()
            .populate('user') // Trae campos específicos del usuario
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await AuditLog.countDocuments();

        res.status(200).json({
            ok: true,
            logs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los registros de auditoría.',
        });
    }
};

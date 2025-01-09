import AuditLog from '../models/AuditLogs.model.js';

export const logAudit = async (action, userId = null, description = '', metadata = {}) => {
    try {
        await AuditLog.create({
            action,
            user: userId,
            description,
            metadata,
        });
    } catch (error) {
        console.error('Error registrando auditoría:', error);
    }
};

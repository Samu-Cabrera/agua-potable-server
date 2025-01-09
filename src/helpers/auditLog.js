import AuditLog from '../models/AuditLogs.model.js';
/**
 * Registra una acción en el log de auditoría.
 * @param {Object} logData - Datos del registro de auditoría.
 * @param {string} logData.user - Usuario que realizó la acción.
 * @param {string} logData.role - Rol del usuario.
 * @param {string} logData.action - Acción realizada.
 * @param {string} logData.description - Descripción de la acción.
 * @param {string} logData.area - Área afectada.
 */
export const logAudit = async (logData) => {
    try {
        const log = new AuditLog(logData);
        await log.save();
        console.log('Registro de auditoría creado con éxito:', log);
    } catch (error) {
        console.error('Error al crear registro de auditoría:', error);
    }
};

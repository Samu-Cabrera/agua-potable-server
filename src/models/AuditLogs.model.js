import { Schema, model } from 'mongoose';

const AuditLogSchema = new Schema({
    action: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Object, default: {} }
}, {timestamps: true});

AuditLogSchema.methods.toJSON = function(){
    const { __v,  ...data} = this.toObject();
    return data;
}

export default model('AuditLog', AuditLogSchema);
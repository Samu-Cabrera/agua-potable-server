import { Schema, model } from 'mongoose';

const AuditLogSchema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'Usuario',     
      required: true 
    },
    action: { type: String, required: true },
    description: { type: String, required: true },
    area: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

AuditLogSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export default model('AuditLog', AuditLogSchema);

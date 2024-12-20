import { Schema, model } from 'mongoose';

const ReciboSchema = new Schema({
    nroRecibo: {
        type: Number,
        required: true,
        unique: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    facturas: [{
        type: Schema.Types.ObjectId,
        ref: 'Factura',
        required: true
    }],
    servicio: {
        type: String,
    },
    formaPago: {
        type: String,
        enum: ['contado', 'credito'],
        required: true
    },
    importe: {
        type: Number,
        required: true
    },
    tesorero: {
        type: String,
        required: true
    },
    fechaEmision: {
        type: Date,
        required: true,
        default: Date.now()
    },
    estado: {
        type: String,
        enum: ['pendiente', 'pagado', 'anulado'],
        default: 'pagado'
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

ReciboSchema.methods.toJSON = function() {
    const { __v, ...recibo } = this.toObject();
    return recibo;
}

export default model('Recibo', ReciboSchema);


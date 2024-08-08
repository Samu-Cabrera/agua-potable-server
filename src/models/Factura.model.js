import { Schema, model } from 'mongoose';

const FacturaSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nroFactura: {
        type: Number,
        required: true,
        unique: true
    },
    consumo: {
        cantidad: {
            type: Number,
            required: true
        },
        iva: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        fecha: {
            type: Date,
            required: true,
            default: Date.now()
        }
    },
    fechaEmision: {
        type: Date,
        required: true,
        default: Date.now()
    },
    fechaVencimiento: {
        type: Date,
        required: true
    },
    cuentaTotal: {
        type: Number,
        required: true
    },
    estadoPago: {
        type: Boolean,
        default: false
    } 

}, {
    timestamps: true
});

FacturaSchema.methods.toJSON = function(){
    const { __v, ...factura } = this.toObject();
    return factura;
}

export default model('Factura', FacturaSchema);
import { Schema, model } from 'mongoose';

const MedidorSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    lectura: {
        type: Number,
        required: true,
    },
    limite: {
        type: Number,
        required: true
    },
    fechaLectura: {
        type: Date,
        required: true
    },
    fechaLimite: {
        type: Date,
        required: true
    }
}, {timestamps: true});

MedidorSchema.methods.toJSON = function(){
    const { __v,  ...data} = this.toObject();
    return data;
}

export default model('Medidor', MedidorSchema);
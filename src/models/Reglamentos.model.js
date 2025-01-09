import { Schema, model } from 'mongoose';

const ReglamentoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
}, {timestamps: true});

ReglamentoSchema.methods.toJSON = function(){
    const { __v,  ...data} = this.toObject();
    return data;
}

export default model('Reglamento', ReglamentoSchema);
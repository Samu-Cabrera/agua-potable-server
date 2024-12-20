import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['ingreso', 'egreso']
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
    
}, {
    timestamps: true,
});

transactionSchema.methods.toJSON = function(){
    const { __v, ...transaction } = this.toObject();
    return transaction;
}

export default model('Transaction', transactionSchema);
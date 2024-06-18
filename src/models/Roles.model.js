import { Schema, model } from 'mongoose';

const RolesSchema = new Schema({
    role: {
        type: String,
        required: true
    }
});

export default model('Role', RolesSchema);


import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    nombre: {
        type: String,
    }
});

export default model('Role', RoleSchema);


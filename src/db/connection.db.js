import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = 'mongodb://localhost:27017/agua-potable-db';
    try {
        await mongoose.connect(uri);
        console.log('Conectada a la base de datos');
    } catch (error) {
        console.log('No se pudo conectar a la base de datos');
        throw new Error('No se pudo conectar a la base de datos');
    }
}


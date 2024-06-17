import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI_DB);
        console.log('Conectada a la base de datos');
    } catch (error) {
        console.log('No se pudo conectar a la base de datos');
        throw new Error('No se pudo conectar a la base de datos');
    }
}


import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDb = async () => {
    await mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((e) => {
            console.log('MongoDB connection failed', e);
        });
}

export default connectDb;
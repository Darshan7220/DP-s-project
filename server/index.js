import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './src/Routes/index.js';
import connectDb from './src/config/db.js';
// import router from './src/Routes/authRoutes.js';

config()
const app = express();
const PORT = process.env.PORT || 10000;

connectDb();

app.use(json());
app.use(cors());

app.use("/api", router)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

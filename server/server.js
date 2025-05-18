
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import deviceRoutes from './routes/deviceRoutes.js';
import deviceDataRoutes from './routes/deviceDataRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';

// Explicitly load .env from the root folder
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to IoT Sense Nexus API. Use /api/devices, /api/data etc.');
});

app.use('/api/devices', deviceRoutes);
app.use('/api/data', deviceDataRoutes);

// If in production, serve client build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

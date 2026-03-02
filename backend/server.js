// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';

// import userRoutes from './routes/userRoutes.js';
// import boardRoutes from './routes/boardRoutes.js';
// import listRoutes from './routes/listRoutes.js';
// import cardRoutes from './routes/cardRoutes.js';

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/boards', boardRoutes);
// app.use('/api/lists', listRoutes);
// app.use('/api/cards', cardRoutes);
// // Ensure this line exists
// // app.use('/api/boards', require('./routes/boardRoutes'));

// // Error Handler
// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode).json({ message: err.message });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));



import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import boardRoutes from './routes/boardRoutes.js';
import listRoutes from './routes/listRoutes.js';
import cardRoutes from './routes/cardRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Configure CORS for your Vercel URL
app.use(cors({
  origin: 'https://sprint-board-six.vercel.app', 
  credentials: true
}));

app.use(express.json());

// Health Check / Root Route
// If you visit https://sprint-board.onrender.com/ you should see this message
app.get('/', (req, res) => {
  res.send('Sprint Board API is running...');
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/cards', cardRoutes);

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ 
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

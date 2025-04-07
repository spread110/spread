const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  
  // Handle user joining a specific room (e.g., order tracking)
  socket.on('join', (roomId) => {
    socket.join(roomId);
    console.log(`Client ${socket.id} joined room: ${roomId}`);
  });
  
  // Handle user leaving a room
  socket.on('leave', (roomId) => {
    socket.leave(roomId);
    console.log(`Client ${socket.id} left room: ${roomId}`);
  });
  
  // Handle order updates
  socket.on('orderUpdate', (data) => {
    // Broadcast to all clients in the specific order room
    io.to(`order-${data.orderId}`).emit('orderUpdated', data);
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// Define routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API routes will be added here
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/products', require('./routes/products'));
// app.use('/api/addresses', require('./routes/addresses'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io server running`);
}); 
// src/index.ts
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { AuthRequest } from './middlewares/auth.middleware';

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

// ✅ Attach io to req properly with AuthRequest type
app.use((req, res, next) => {
  (req as AuthRequest).io = io;
  next();
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_board', (boardId: string) => {
    socket.join(boardId);
    console.log(`User ${socket.id} joined board ${boardId}`);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

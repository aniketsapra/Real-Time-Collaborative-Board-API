// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';
// import { json } from 'body-parser';
// import cardRoutes from './routes/card.route';
// import columnRoutes from './routes/column.route';
// import './types/express';
// // import other routes

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // or frontend origin
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//   },
// });

// // Add middleware to inject `io` into requests
// app.use((req: any, res, next) => {
//   req.io = io;
//   next();
// });

// app.use(cors());
// app.use(json());

// // Your routes
// app.use('/api/cards', cardRoutes);
// app.use('/api/columns', columnRoutes);

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('join_board', (boardId: string) => {
//     socket.join(boardId);
//     console.log(`Joined board: ${boardId}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

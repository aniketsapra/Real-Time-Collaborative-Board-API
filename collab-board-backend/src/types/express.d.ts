// types/express.d.ts
import { Server as IOServer } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
      io?: IOServer;
    }
  }
}

export {}; // ← this is important to make the file a module

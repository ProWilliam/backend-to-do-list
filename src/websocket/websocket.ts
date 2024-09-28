import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Verificar token JWT
function verifyToken(token: string): Promise<JwtPayload | string> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded!);
    });
  });
}

export const createWebSocket = (server: Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  //Handle Socket.IO connection
  io.on('connection', async (socket) => {
    console.log("Started Socket.IO connection", socket.id);

    // Extract the token from the headers or the query
    const token = socket.handshake.query.token as string;

    try {
      // Verify the JWT token
      if (!token) throw new Error('No token provided');
      const decoded = await verifyToken(token);
      console.log('Authenticated user:', decoded);

      // Listen to incoming messages from the client
      socket.on('message', (message: string) => {
        console.log('Received message:', message);

        // Send the message to all connected clients
        io.emit('message', message);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Disconnected client');
      });

    } catch (err) {
      console.error('Invalid token', err);
      console.log('-'.repeat(50));
      socket.disconnect(); // Disconnect the client if the token is invalid
    }
  });
}

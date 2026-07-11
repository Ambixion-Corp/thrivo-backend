import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { to: string; text: string },
  ) {
    // In production, Redis Stack cluster handles pub/sub signaling across server instances.
    this.server.to(payload.to).emit('messageReceived', {
      senderId: client.id,
      text: payload.text,
      timestamp: new Date().toISOString(),
    });
  }
}

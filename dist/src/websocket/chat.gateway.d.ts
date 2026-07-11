import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleMessage(client: Socket, payload: {
        to: string;
        text: string;
    }): void;
}

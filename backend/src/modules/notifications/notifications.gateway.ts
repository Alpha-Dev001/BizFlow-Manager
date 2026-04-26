import {  
 WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';

@WebSocketGateway({
    cors:{ origin: "*"},
    namespace: "notifications"
})

export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server:Server;
private connectedUsers = new Map<string, string>();

    handleConnection(client:Socket){
        console.log(`Notification client connected : ${client.id}`)
    }

    handleDisconnect(client:Socket){
        console.log(`Notification client disconnected : ${client.id}`)
    }

    @SubscribeMessage('authenticate')
    handleAuthenticate(@ConnectedSocket() client:Socket,@MessageBody() data: {userId: string}) {
        this.connectedUsers.set(client.id,data.userId);
        console.log(`User ${data.userId} authenticated for notifications`);

        client.join(`user : ${data.userId}`);

        return { event: 'authenticated' ,userId:data.userId}
    }

    sendNotificationToCompany(userIds:string[],notification:any){
        userIds.forEach((userId) => {
            this.server.to(`user:${userId}`).emit('notification',notification);
        });
    }

    sendNotificationToUser(userId:string,notification:any) {
        this.server.to(`user:${userId}`).emit('notification',notification);
    }
}




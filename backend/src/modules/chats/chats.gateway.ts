import { 
WebSocketGateway,
WebSocketServer,
SubscribeMessage,
MessageBody,
ConnectedSocket,
OnGatewayConnection,
OnGatewayDisconnect,

} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { SendMessaageDto } from './dto/send-message.dto';
import { JoinChannelDto } from './dto/join-channel.dto';
import { UseGuards } from '@nestjs/common';


@WebSocketGateway({
    cors:{ origin:"*" },
    namespace: 'chat'
})

export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;
    
    private connectedUsers = new Map<string, string>();

    constructor(private readonly chatsService: ChatsService) {}

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinChannel')
    async handleJoinChannel(@MessageBody() dto:JoinChannelDto, @ConnectedSocket() client: Socket) {
        client.join(dto.channelId);
        console.log(`Client ${client.id} joined channel ${dto.channelId}`)

         return { event: 'joinedChannel', channelId: dto.channelId };
    }

    
    @SubscribeMessage('leaveChannel')
    async handleLeaveChannel(@ConnectedSocket() client: Socket,
    @MessageBody() dto: JoinChannelDto){
        client.leave(dto.channelId);
        console.log(`Client ${client.id} left channel ${dto.channelId}`);

        return { event: 'LeftChannel',channelId: dto.channelId}
    }


    @SubscribeMessage('sendMessaage')
    async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() dto: SendMessaageDto) {
        const senderId = this.connectedUsers.get(client.id)

        if(!senderId){
             client.emit('error', { message: 'Unauthorized' });
            return;
        }

        const message = await this.chatsService.saveMessage(senderId,dto);

        this.server.to(dto.channelId).emit('New message',message);

        return message;
    }

    @SubscribeMessage('authenticate')
    async handleAuthenticate(@ConnectedSocket() client: Socket,@MessageBody() data: { userId: string }) {
        this.connectedUsers.set(client.id, data.userId);
        console.log(`User ${data.userId} authenticated on socket ${client.id}`);

        return { event: 'authenticated', userId:data.userId};
    }
    
}

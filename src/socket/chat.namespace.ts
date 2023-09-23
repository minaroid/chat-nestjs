// import { Socket } from 'socket.io';
// import { CreateGameDataDTO } from './dto/message-dto';
// import { WsClientEvent } from '../typs';
// import { WSCommExceptionsFilter } from './WSFilter.filter';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server as SocketIOServer } from 'socket.io';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthSocket, WSAuthMiddleware } from './auth.middleware.ts';
import { UserService } from '../modules/user/user.service.js';
import { JoinRoomEventDto } from './dtos/join-room-event-dto.js';
import { plainToClass } from 'class-transformer';
import { MessageEventDto } from './dtos/message-event-dto.js';
import { ChatService } from 'src/modules/chat/chat.service.js';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
@UseFilters()
@WebSocketGateway({
  transports: ['websocket'],
  cors: { origin: '*' },
  namespace: '/chat',
})
export class ChatServer implements NestGateway {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}
  @WebSocketServer()
  server: SocketIOServer;

  afterInit(server: SocketIOServer) {
    const middle = WSAuthMiddleware(this.jwtService, this.userService);
    server.use(middle);
    console.log(`WS ${ChatServer.name} init`);
  }

  handleDisconnect(client: AuthSocket) {
    console.log('client disconnect', client.user);
  }

  handleConnection(client: AuthSocket, ...args: any[]) {
    console.log('client connect', client.id, client.user.username);
    // TODO: join user in his rooms.
  }

  @SubscribeMessage('join-room')
  onJoinRoom(@ConnectedSocket() client: AuthSocket, @MessageBody() body: any) {
    const msg = plainToClass(JoinRoomEventDto, JSON.parse(body), {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    // const joinRoomReq = new JoinRoomRequestDto();
    // joinRoomReq.roomId = msg.roomId;
    // joinRoomReq.userId = client.user;

    // const room = this.chatService.joinRoom(new CreateRoomRequestDto());
    // console.log(JSON.stringify(msg));
    // client.join(msg.roomId);
    // this.server.to(msg.roomId).emit('message', { test: 123 });
  }

  @SubscribeMessage('send-message')
  onMessage(@ConnectedSocket() client: AuthSocket, @MessageBody() body: any) {
    const msg = plainToClass(MessageEventDto, JSON.parse(body), {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    console.log(JSON.stringify(msg));
    this.server
      .to(msg.roomId)
      .emit('message', { message: `${client.user} : ${msg.message}` });
  }
}

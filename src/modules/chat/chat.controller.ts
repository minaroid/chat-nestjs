import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateRoomRequestDto } from './dtos/create-request-dto';
import { CreateRoomResponseDto } from './dtos/create-response-dto';
import { JoinRoomRequestDto } from './dtos/join-request-dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/create')
  async register(
    @Body() body: CreateRoomRequestDto,
  ): Promise<CreateRoomResponseDto> {
    return this.chatService.createRoom(body);
  }

  @Post('/join')
  async join(@Body() body: JoinRoomRequestDto): Promise<CreateRoomResponseDto> {
    return this.chatService.joinRoom(body);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { RoomModel } from 'src/database/models/room.model';

import { RoomRepository } from 'src/database/repositories/room.repository';
import { CreateRoomRequestDto } from './dtos/create-request-dto';
import { CreateRoomResponseDto } from './dtos/create-response-dto';
import { plainToClass } from 'class-transformer';
import { JoinRoomRequestDto } from './dtos/join-request-dto';

@Injectable()
export class ChatService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async createRoom(data: CreateRoomRequestDto): Promise<CreateRoomResponseDto> {
    const room = await this.roomRepository.create(data);
    const dto = plainToClass(CreateRoomResponseDto, room, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    return dto;
  }

  async joinRoom(data: JoinRoomRequestDto): Promise<CreateRoomResponseDto> {
    const room = await this.roomRepository.updateOneAndReturn(data.roomId, {
      $push: { users: data.userId },
    });

    if (room) {
      const dto = plainToClass(CreateRoomResponseDto, room, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
      return dto;
    }

    throw new HttpException('Create room first', 404);
  }
}

import { IsArray, IsString } from 'class-validator';

export class JoinRoomRequestDto {
  @IsString()
  roomId: string;

  @IsString()
  userId: string;
}

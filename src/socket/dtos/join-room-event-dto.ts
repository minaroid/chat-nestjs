import { Expose } from 'class-transformer';

export class JoinRoomEventDto {
  @Expose()
  readonly roomId: string;
}

import { Expose } from 'class-transformer';

export class MessageEventDto {
  @Expose()
  readonly roomId: string;

  @Expose()
  readonly message: string;
}

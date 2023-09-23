import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  token: string;

  @Expose()
  readonly id: string;

  @Expose()
  readonly username: string;

  @Expose()
  readonly name: string;
}

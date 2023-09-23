import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserResponseDto } from 'src/modules/user/dtos/user-response.dto';

export class CreateRoomResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly icon: string;

  @Expose()
  readonly users: [UserResponseDto];
}

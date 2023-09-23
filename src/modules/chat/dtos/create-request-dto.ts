import { IsArray, IsString } from 'class-validator';

export class CreateRoomRequestDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly icon: string;

  @IsArray()
  readonly users: [string];
}

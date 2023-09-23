import { IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly name: string;
}

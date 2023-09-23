import { IsString } from 'class-validator';

export class TokenPayloadDto {
  @IsString()
  readonly username: string;
}

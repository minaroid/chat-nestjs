import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from './dtos/register-request-dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { LoginRequestDto } from './dtos/login-request-dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() body: RegisterRequestDto): Promise<UserResponseDto> {
    return this.userService.register(body);
  }

  @Post('/login')
  async login(@Body() body: LoginRequestDto): Promise<UserResponseDto> {
    return this.userService.login(body);
  }
}

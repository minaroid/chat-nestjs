import { HttpException, Injectable } from '@nestjs/common';
import { RegisterRequestDto } from './dtos/register-request-dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/database/repositories/user.repository';
import { json } from 'stream/consumers';
import { LoginRequestDto } from './dtos/login-request-dto';
import { UserModel } from 'src/database/models/user.model';
// import { DatabaseException } from 'src/core/exceptions/database.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async register(data: RegisterRequestDto): Promise<UserResponseDto> {
    const token = await this.jwtService.signAsync({ username: data.username });
    const dto = new UserResponseDto();
    dto.token = token;
    const user = await this.userRepository.create(data);
    if (user) {
      const dto = plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
      dto.token = token;
      return dto;
    }
    throw new HttpException('Invalid Data', 404);
  }

  async login(data: LoginRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ username: data.username });
    if (user) {
      const token = await this.jwtService.signAsync({
        username: user.username,
        id: user._id,
      });
      const dto = plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
      dto.token = token;
      return dto;
    }
    throw new HttpException('Invalid username', 404);
  }

  async profile(username: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({ username: username });
    if (user) {
      return user;
    }
    throw new HttpException('Invalid username', 404);
  }
}

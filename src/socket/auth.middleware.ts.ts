import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { TokenPayloadDto } from 'src/core/dtos/token-payload-dto';
import { UserService } from '../modules/user/user.service';

export interface AuthSocket extends Socket {
  user: any; // TODO replace with user model.
}
export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => void;

export const WSAuthMiddleware = (
  jwtService: JwtService,
  userService: UserService,
): SocketMiddleware => {
  return async (socket: AuthSocket, next) => {
    try {
      const token = socket.handshake.headers.token ?? '';
      const jwtPayload = jwtService.verify(token as string) as TokenPayloadDto;
      const userResult = await userService.profile(jwtPayload.username);
      if (userResult) {
        socket.user = userResult;
        next();
      } else {
        next({
          name: 'Unauthorizaed',
          message: 'Unauthorizaed',
        });
      }
    } catch (error) {
      next({
        name: 'Unauthorizaed',
        message: 'Unauthorizaed',
      });
    }
  };
};

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Environments } from 'src/core/Environments';
import { documents } from 'src/database/models';
import { ProductController } from 'src/modules/user/product/product.controller';
import { ProductService } from 'src/modules/user/product/product.service';
import { repositories } from 'src/database/repositories';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ChatServer } from 'src/socket/chat.namespace';
import { ChatController } from '../chat/chat.controller';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [
    MongooseModule.forRoot(Environments.DB_URL),
    MongooseModule.forFeature(documents),
    JwtModule.register({
      global: true,
      secret: Environments.TOKEN_SECRET,
      signOptions: { expiresIn: Environments.TOKEN_EXPIRES_IN },
    }),
  ],
  controllers: [
    AppController,
    ProductController,
    UserController,
    ChatController,
  ],
  providers: [
    ChatServer,
    AppService,
    ProductService,
    UserService,
    ChatService,
    ...repositories,
  ],
})
export class AppModule {}

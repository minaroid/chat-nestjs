import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../models/user.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepository {}

@Injectable()
export class UserRepository
  extends BaseRepository<UserModel>
  implements IUserRepository
{
  constructor(
    @InjectModel(UserModel.name)
    private readonly model: Model<UserModel>,
  ) {
    super(model);
  }
}

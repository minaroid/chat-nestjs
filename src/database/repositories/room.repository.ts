import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomModel } from '../models/room.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoomRepository {}

@Injectable()
export class RoomRepository
  extends BaseRepository<RoomModel>
  implements IRoomRepository
{
  constructor(
    @InjectModel(RoomModel.name)
    private readonly model: Model<RoomModel>,
  ) {
    super(model);
  }
}

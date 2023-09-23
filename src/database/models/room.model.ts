import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { BaseModel } from './base.model';

@Schema({ collection: 'room' })
export class RoomModel extends BaseModel {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  icon: string;
  @Prop({ required: true, trim: true })
  users: [{ type: ObjectId; ref: 'user' }];
}

export type RoomDocument = HydratedDocument<RoomModel>;
export const RoomSchema = SchemaFactory.createForClass(RoomModel);

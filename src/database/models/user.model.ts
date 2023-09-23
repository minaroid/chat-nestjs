import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from './base.model';

@Schema({ collection: 'user' })
export class UserModel extends BaseModel {
  _id: string;

  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: true, trim: true })
  name: string;
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserSchema = SchemaFactory.createForClass(UserModel);

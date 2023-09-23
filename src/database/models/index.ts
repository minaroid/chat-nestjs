import { RoomModel, RoomSchema } from './room.model';
import { UserModel, UserSchema } from './user.model';

export const documents = [
  { name: UserModel.name, schema: UserSchema },
  { name: RoomModel.name, schema: RoomSchema },
];

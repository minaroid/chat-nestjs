import { Prop } from '@nestjs/mongoose';

export class BaseModel {
  @Prop({ default: null })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id?: string;
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;

  

}

export const UserSchema = SchemaFactory.createForClass(User);

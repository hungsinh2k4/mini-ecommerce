// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // auto extra createdAt và updatedAt
export class User {
  @Prop({ required: true }) // name is required
  name: string;

  @Prop({ required: true, unique: true }) // email is unique
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) 
  roles: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
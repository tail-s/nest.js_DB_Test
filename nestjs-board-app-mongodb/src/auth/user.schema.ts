import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Board } from 'src/boards/board.schema';

@Schema()
export class User extends Document {

  @Prop({
    unique: true,
  })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Board' }] })
  boards: Board[];
}

export const UserSchema = SchemaFactory.createForClass(User);
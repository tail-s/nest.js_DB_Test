import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.schema';

@Schema({
  timestamps: true,
})
export class Board extends Document {

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  status: BoardStatus;

  @Prop({
    required: true,
  })
  writer: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  attachment?: string;

  @Prop()
  originalFilename?: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
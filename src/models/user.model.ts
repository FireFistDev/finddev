import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { resumeDTO } from 'src/dto/resume.dto';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true ,unique:true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  confirmPassword: string;
  @Prop({default:{}})
  resume: resumeDTO;

}

export const userSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResumeDocument = Resume & Document;

@Schema()
export class Resume {
  @Prop({ required: true })
  jobTitle: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop({ required: true })
  picturePath: string;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  gitHub: string;
  @Prop({ required: true })
  linkedIn: string;
  @Prop({ required: true })
  jobExperience: [
    {
      company: string;
      position: string;
      date: string;
      desc: string;
    },
  ];
  @Prop({ required: true })
  education: [
    {
      school: string;
      degrre: string;
      date: string;
      desc: string;
    },
  ];
  @Prop({ required: true })
  technologies: [string];
}

export const resumeSchema = SchemaFactory.createForClass(Resume);

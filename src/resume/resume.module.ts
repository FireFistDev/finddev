import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resume, resumeSchema } from 'src/models/resume.model';
import { User, userSchema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: resumeSchema },{ name: User.name, schema: userSchema }])],
  controllers: [ResumeController],
  providers: [ResumeService]
})
export class ResumeModule {}

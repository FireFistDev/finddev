import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { resumeDTO } from 'src/dto/resume.dto';
import { Resume, ResumeDocument } from 'src/models/resume.model';
import { User, UserDocument } from 'src/models/user.model';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async getAllResume() {
    try {
      return await this.resumeModel.find();
    } catch (error) {
      return error.message;
    }
  }
  async createResume(data: resumeDTO,userId:string) {
    try {
      if (!data) return;
      const resume = await this.resumeModel.create(data);
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { resume: resume }, // Set the resume field to the newly created resume
        { new: true } // Return the updated user object
      );
        return updatedUser
    } catch (error) {
        return error.message;
    }
  }
  async filterResume(data:{jobTitle:string}) {
    try {
      if (!data) return;
      return await this.resumeModel.find(data);
    } catch (error) {
        return error.message;
    }
  }
  async updateResume(id: string, data: Partial<resumeDTO>) {
    try {
      if (!id || !data) return;

      return await this.resumeModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      return error.message;
    }
  }
}

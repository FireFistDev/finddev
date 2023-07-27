import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { resumeDTO } from 'src/dto/resume.dto';
import { Resume, ResumeDocument } from 'src/models/resume.model';
import { User, UserDocument } from 'src/models/user.model';
let prevResumeIndex = -1;
@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async getResume(Filter: { jobTitle: string; }) {
    try {
      let resume = await this.resumeModel.find();
      if(Filter){
        resume =  await this.resumeModel.find({jobTitle:Filter.jobTitle});
      }
      console.log(resume)
      
        let resumeIndex: number;
        // Generate a random index different from the previous one
        do {
          resumeIndex = Math.floor(Math.random() * resume.length);
        } while (resumeIndex === prevResumeIndex);
        
        prevResumeIndex = resumeIndex; // Store the current index as previous for the next request
        return resume[resumeIndex];
    } catch (error) {
      return error.message;
    }
  }
  async getSingleResume(userId :string) {
    try {

       let  resume =  await this.resumeModel.findById(userId);
      
        return resume;
    } catch (error) {
      return error.message;
    }
  }
  async createResume(data: resumeDTO,userId:string) {
    try {
      if (!data) return;
      const resume = await this.resumeModel.create({...data,owner:userId});
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
      const resume = await this.resumeModel.find(data);
      let resumeIndex: number;
  
      // Generate a random index different from the previous one
      do {
        resumeIndex = Math.floor(Math.random() * resume.length);
      } while (resumeIndex === prevResumeIndex);
  
      prevResumeIndex = resumeIndex; // Store the current index as previous for the next request
      return resume[resumeIndex];
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
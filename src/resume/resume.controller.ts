import { Controller, Post, Body, Get,Param } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { resumeDTO } from 'src/dto/resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}
  @Post('create/:id')
  createResume(@Param('id') userId:string,@Body() data: resumeDTO) {
    return this.resumeService.createResume(data,userId )
  }
  @Post('filter')
  filterResume(@Body() data: {jobTitle:string}) {
    return this.resumeService.filterResume(data)
  }
  @Post('update')
  updateResume(@Body() data:resumeDTO) {
    return this.resumeService.filterResume(data)
  }
  @Get()
  getAllResume() {
    return this.resumeService.getAllResume();
  }
}

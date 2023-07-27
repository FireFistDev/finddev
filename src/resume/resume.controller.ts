import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { resumeDTO } from 'src/dto/resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) { }
  @Post('create/:id')
  createResume(@Param('id') userId: string, @Body() data: resumeDTO) {
    return this.resumeService.createResume(data, userId)
  }

  @Post('update')
  updateResume(@Body() data: resumeDTO) {
    return this.resumeService.filterResume(data)
  }
  @Get()
  getResume(@Query() Filter: any) {
    return this.resumeService.getResume(Filter);
  }
  @Get(':id')
  getSingleResume(@Param('id') userId: string) {

    return this.resumeService.getSingleResume(userId);
  }
}

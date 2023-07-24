import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { userDTO } from 'src/dto/user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() data:userDTO){
    if(!data) return
    return this.userService.createUser(data)
  }
  @Post('login')
  login(@Body() data : {email:string ,password:string}){
    return this.userService.login(data)
  }

}

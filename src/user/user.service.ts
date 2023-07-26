import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDTO } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(data: userDTO) {
    try {
      const saltOrRounds = 10; // You can adjust the number of rounds as needed (higher value means more secure but slower)
      if(!data.password ) return { status: 'failed', message: 'password does not present' };
      if (data.password !== data.confirmPassword) return { status: 'failed', message: 'password does not match' };
      const password = await bcrypt.hash(data.password, saltOrRounds);
      const newPerson = await this.userModel.create({
        email: data.email,
        password: password,
        confirmPassword: password,
      });
      const payload = { sub: newPerson._id, email: newPerson.email };
      console.log(payload)
      return { status: 'succese', data: newPerson, access_token: await this.jwtService.signAsync(payload),};
    } catch (error) {
      return error.message;
    }
  }
  async login(data: { email: string; password: string }) {
    try {
      const { email, password } = data;
      const user = await this.userModel.findOne({ email });
      if (!user) return 'user not found';
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) return 'passowrd is incorect';
      const payload = { sub: user._id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      return error.message;
    }
  }
}

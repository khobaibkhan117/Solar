import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service'
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    JwtModule.register({
      global:true,
    secret:process.env.PRIVATE_KEY,
    signOptions:{expiresIn:"1h"}
  })]
})
export class UserModule {}

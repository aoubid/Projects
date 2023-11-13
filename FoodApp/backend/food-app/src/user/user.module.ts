import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Schema/user.schema';
import { UserController } from './Controller/user.controller';
import { UserDAO } from './DAO/user.dao';
import { UserService } from './Service/user.service';



@Module({

    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService, UserDAO],
      exports: [UserService],

})
export class UserModule {}

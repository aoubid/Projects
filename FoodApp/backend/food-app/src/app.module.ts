import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from './recipes/recipe.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    
    UserModule,
    RecipeModule,
    AuthModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

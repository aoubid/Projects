import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './Schema/recipe.schema';
import { RecipeController } from './Controller/recipe.controller';
import { RecipeDAO } from './DAO/recipe.dao';
import { RecipeService } from './Service/recipe.service';



@Module({

    imports: [
        MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
      ],
      controllers: [RecipeController],
      providers: [RecipeService, RecipeDAO],
      exports: [RecipeService],

})
export class RecipeModule {}

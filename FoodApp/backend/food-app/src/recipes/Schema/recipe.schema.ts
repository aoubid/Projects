import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  _id?: string;
  @Prop()
  titre: string;
  @Prop()
  desc: string;

  

}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

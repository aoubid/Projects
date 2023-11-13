import { Injectable } from '@nestjs/common';
import { RecipeDAO, queryOptions } from '../DAO/recipe.dao';
import { Recipe } from '../Schema/recipe.schema';

@Injectable()
export class RecipeService {
  constructor(private recipeDAO: RecipeDAO) {}

  findAll(options: queryOptions = {}) {
    return this.recipeDAO.findAll(options);
  }
  create(data: Recipe) {
    return this.recipeDAO.create(data);
  }

  findOne(id: string) {
    return this.recipeDAO.findOne(id);
  }
  update(id: string, data: Recipe) {
    return this.recipeDAO.update(id, data);
  }
  delete(id: string) {
    return this.recipeDAO.delete(id);
  }
}

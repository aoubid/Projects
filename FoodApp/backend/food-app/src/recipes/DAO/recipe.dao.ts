import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, Types } from 'mongoose';
import { Recipe, RecipeDocument } from '../Schema/recipe.schema';

@Injectable()
export class RecipeDAO {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  findAll(options: QueryOptions) {
    return this.recipeModel.aggregate([
      {
        $match: {
          $or: [
            {
              name: {
                $regex: options.search || '',
                $options: 'i',
              },
            },
          ],
        },
      },
      {
        $match: options.filter || {},
      },
      {
        $facet: {
          docs: [
            {
              $sort: options.sort || { _id: -1 },
            },
            {
              $skip: ((options.page || 1) - 1) * options.limit || 0,
            },
            { $limit: options.limit || 10 },
          ],
          meta: [
            { $count: 'totalDocs' },
            {
              $addFields: {
                page: options.page || 1,
                limit: options.limit || 10,
                totalPages: {
                  $ceil: {
                    $divide: ['$totalDocs', options.limit || 10],
                  },
                },
              },
            },
          ],
        },
      },
      {
        $unwind: '$meta', // Déplier le tableau meta en objet unique
      },
    ]);
  }

  create(data: Recipe) {
    return this.recipeModel.create(data);
  }

  delete(id: string) {
    return this.recipeModel.deleteOne({ _id: id });
  }

  findOne(id: string) {
    return this.recipeModel.findOne({ _id: id });
  }

  update(id: string, data: Recipe) {
    return this.recipeModel.updateOne({ _id: id }, data);
  }
}

export interface queryOptions {
  search?: string;
  sort?: string;
  limit?: number;
  page?: number;
  filter?: any;
}

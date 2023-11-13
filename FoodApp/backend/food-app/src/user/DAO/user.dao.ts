import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, Types } from 'mongoose';
import { User, UserDocument } from '../Schema/user.schema';

@Injectable()
export class UserDAO {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  findAll(options: QueryOptions) {
    return this.userModel.aggregate([
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

  create(data: User) {
    return this.userModel.create(data);
  }

  delete(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  findOne(username: string) {
    return this.userModel.findOne({ username: username });
  }

  update(id: string, data: User) {
    return this.userModel.updateOne({ _id: id }, data);
  }
}

export interface queryOptions {
  search?: string;
  sort?: string;
  limit?: number;
  page?: number;
  filter?: any;
}

import { BaseModel } from '../models/base.model';
import { Model } from 'mongoose';

export interface IBaseRepository<Entity extends BaseModel> {
  findAll(): Promise<Entity[]>;
  findOne(): Promise<Entity | null>;
  findOneById(id: string): Promise<Entity | null>;
  create(createAttr: any): Promise<Entity>;
  updateOneAndReturn(id: string, updateAttr: any): Promise<Entity | null>;
  deleteOneAndReturn(id: string): Promise<Entity | null>;
}

export abstract class BaseRepository<Entity extends BaseModel>
  implements IBaseRepository<Entity>
{
  constructor(readonly docModel: Model<Entity>) {}

  findOneById(id: string): Promise<Entity | null> {
    return this.docModel.findOne({ _id: id }).exec();
  }

  updateOneAndReturn(id: string, updateAttr: any): Promise<Entity | null> {
    const withUpdatedAt = { updatedAt: new Date(), ...updateAttr };
    return this.docModel.findOneAndUpdate({ _id: id }, withUpdatedAt).exec();
  }

  deleteOneAndReturn(id: string): Promise<Entity | null> {
    return this.docModel
      .findByIdAndUpdate({ _id: id }, { deletedAt: new Date() })
      .exec();
  }

  findAll(filters = {}, includeDeleted = false): Promise<Entity[]> {
    let newFilters = filters;
    if (!includeDeleted) {
      newFilters = { deletedAt: { $eq: null }, ...newFilters };
    }
    return this.docModel.find(newFilters).exec();
  }

  findOne(filters = {}, includeDeleted = false): Promise<Entity | null> {
    let newFilters = filters;
    if (!includeDeleted) {
      newFilters = { deletedAt: { $eq: null }, ...newFilters };
    }
    return this.docModel.findOne(newFilters).exec();
  }

  create(createAttr: any): Promise<Entity> {
    const withCreatedAt = { createdAt: new Date(), ...createAttr };
    const created = new this.docModel(withCreatedAt);
    return created.save();
  }
}

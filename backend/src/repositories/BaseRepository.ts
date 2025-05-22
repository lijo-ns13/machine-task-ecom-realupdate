import {
  Model,
  HydratedDocument,
  FilterQuery,
  UpdateQuery,
  Types,
} from "mongoose";
import { injectable } from "inversify";
import { IBaseRepository } from "../interface/repositories/IBaseRepository";

@injectable()
export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(entity: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(entity);
  }

  async findById(id: string): Promise<HydratedDocument<T> | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id);
  }

  async update(
    id: string,
    updateData: UpdateQuery<T>
  ): Promise<HydratedDocument<T> | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await this.model.deleteOne({ _id: id } as FilterQuery<T>);
    return result.deletedCount === 1;
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<HydratedDocument<T>[]> {
    return this.model.find(filter);
  }

  async findOne(
    filter: FilterQuery<T>,
    populate: Array<{ path: string; select?: string }> = []
  ): Promise<HydratedDocument<T> | null> {
    let query = this.model.findOne(filter);
    for (const pop of populate) {
      query = query.populate(pop);
    }
    return query.exec();
  }

  async findAllPaginated(
    filter: FilterQuery<T> = {},
    page = 1,
    limit = 10
  ): Promise<{ data: HydratedDocument<T>[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit),
      this.model.countDocuments(filter),
    ]);
    return { data, total };
  }
}

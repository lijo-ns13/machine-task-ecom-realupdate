import { HydratedDocument, FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
  create(entity: Partial<T>): Promise<HydratedDocument<T>>;
  findById(id: string): Promise<HydratedDocument<T> | null>;
  update(
    id: string,
    updateData: UpdateQuery<T>
  ): Promise<HydratedDocument<T> | null>;
  delete(id: string): Promise<boolean>;
  findAll(filter?: FilterQuery<T>): Promise<HydratedDocument<T>[]>;
  findOne(
    filter: FilterQuery<T>,
    populate?: Array<{ path: string; select?: string }>
  ): Promise<HydratedDocument<T> | null>;
  findAllPaginated?(
    filter: FilterQuery<T>,
    page?: number,
    limit?: number
  ): Promise<{ data: HydratedDocument<T>[]; total: number }>;
}

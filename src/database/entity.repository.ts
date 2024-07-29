import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
  PopulateOptions,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    populateOptions?: PopulateOptions[],
  ): Promise<T | null> {
    let query = this.entityModel.findOne(entityFilterQuery, {
      __v: 0,
      ...projection,
    });

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    return query.exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    populateOptions?: PopulateOptions[],
  ): Promise<T[] | null> {
    let query = this.entityModel.find(entityFilterQuery);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    return query.exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
    populateOptions?: PopulateOptions,
  ): Promise<T | null> {
    let query = this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    return query.exec();
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteOne(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}

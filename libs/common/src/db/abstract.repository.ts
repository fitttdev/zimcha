import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<Document extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<Document>) {}

  async create(document: Omit<Document, '_id'>): Promise<Document> {
    const record = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await record.save()).toJSON() as unknown as Document;
  }

  async findOne(filterQuery: FilterQuery<Document>): Promise<Document> {
    const document = await this.model.findOne(filterQuery).lean<Document>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery'), filterQuery;
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Document>,
    update: UpdateQuery<Document>,
  ): Promise<Document> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<Document>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery'), filterQuery;
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<Document>): Promise<Document[]> {
    return this.model.find(filterQuery).lean<Document[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<Document>,
  ): Promise<Document> {
    return this.model.findOneAndDelete(filterQuery).lean<Document>(true);
  }
}

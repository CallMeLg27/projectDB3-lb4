import {DefaultCrudRepository} from '@loopback/repository';
import {Comments, CommentsRelations} from '../models';
import {MongocloudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CommentsRepository extends DefaultCrudRepository<
  Comments,
  typeof Comments.prototype.id,
  CommentsRelations
> {
  constructor(
    @inject('datasources.mongocloud') dataSource: MongocloudDataSource,
  ) {
    super(Comments, dataSource);
  }
}

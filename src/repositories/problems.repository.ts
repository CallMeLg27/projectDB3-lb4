import {DefaultCrudRepository} from '@loopback/repository';
import {Problems, ProblemsRelations} from '../models';
import {MongocloudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProblemsRepository extends DefaultCrudRepository<
  Problems,
  typeof Problems.prototype.id,
  ProblemsRelations
> {
  constructor(
    @inject('datasources.mongocloud') dataSource: MongocloudDataSource,
  ) {
    super(Problems, dataSource);
  }
}

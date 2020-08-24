import {DefaultCrudRepository} from '@loopback/repository';
import {Internets, InternetsRelations} from '../models';
import {MongocloudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InternetsRepository extends DefaultCrudRepository<
  Internets,
  typeof Internets.prototype.id,
  InternetsRelations
> {
  constructor(
    @inject('datasources.mongocloud') dataSource: MongocloudDataSource,
  ) {
    super(Internets, dataSource);
  }
}

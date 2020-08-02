import {DefaultCrudRepository} from '@loopback/repository';
import {Cellphones, CellphonesRelations} from '../models';
import {MongocloudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CellphonesRepository extends DefaultCrudRepository<
  Cellphones,
  typeof Cellphones.prototype.id,
  CellphonesRelations
> {
  constructor(
    @inject('datasources.mongocloud') dataSource: MongocloudDataSource,
  ) {
    super(Cellphones, dataSource);
  }
}

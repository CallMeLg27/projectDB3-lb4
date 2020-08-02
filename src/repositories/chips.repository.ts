import {DefaultCrudRepository} from '@loopback/repository';
import {Chips, ChipsRelations} from '../models';
import {MongocloudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ChipsRepository extends DefaultCrudRepository<
  Chips,
  typeof Chips.prototype.id,
  ChipsRelations
> {
  constructor(
    @inject('datasources.mongocloud') dataSource: MongocloudDataSource,
  ) {
    super(Chips, dataSource);
  }
}

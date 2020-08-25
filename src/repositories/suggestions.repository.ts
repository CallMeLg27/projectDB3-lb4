import {DefaultCrudRepository} from '@loopback/repository';
import {Suggestions, SuggestionsRelations} from '../models';
import {MongocloudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SuggestionsRepository extends DefaultCrudRepository<
  Suggestions,
  typeof Suggestions.prototype.id,
  SuggestionsRelations
> {
  constructor(
    @inject('datasources.mongocloud') dataSource: MongocloudDataSource,
  ) {
    super(Suggestions, dataSource);
  }
}

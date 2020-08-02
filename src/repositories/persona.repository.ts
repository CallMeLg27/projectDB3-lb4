import {DefaultCrudRepository} from '@loopback/repository';
import {Persona, PersonaRelations} from '../models';
import {LocalmongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {
  constructor(
    @inject('datasources.localmongo') dataSource: LocalmongoDataSource,
  ) {
    super(Persona, dataSource);
  }
}

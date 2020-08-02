import {DefaultCrudRepository} from '@loopback/repository';
import {Mascota, MascotaRelations} from '../models';
import {MongocloudDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {
  constructor(
    @inject('datasources.mongocloud') dataSource: MongocloudDataSource,
  ) {
    super(Mascota, dataSource);
  }
}

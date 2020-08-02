import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Cellphones} from '../models';
import {CellphonesRepository} from '../repositories';

export class CellphonesController {
  constructor(
    @repository(CellphonesRepository)
    public cellphonesRepository : CellphonesRepository,
  ) {}

  @post('/cellphones', {
    responses: {
      '200': {
        description: 'Cellphones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cellphones)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cellphones, {
            title: 'NewCellphones',
            exclude: ['id'],
          }),
        },
      },
    })
    cellphones: Omit<Cellphones, 'id'>,
  ): Promise<Cellphones> {
    return this.cellphonesRepository.create(cellphones);
  }

  @get('/cellphones/count', {
    responses: {
      '200': {
        description: 'Cellphones model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Cellphones) where?: Where<Cellphones>,
  ): Promise<Count> {
    return this.cellphonesRepository.count(where);
  }

  @get('/cellphones', {
    responses: {
      '200': {
        description: 'Array of Cellphones model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cellphones, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Cellphones) filter?: Filter<Cellphones>,
  ): Promise<Cellphones[]> {
    return this.cellphonesRepository.find(filter);
  }

  @patch('/cellphones', {
    responses: {
      '200': {
        description: 'Cellphones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cellphones, {partial: true}),
        },
      },
    })
    cellphones: Cellphones,
    @param.where(Cellphones) where?: Where<Cellphones>,
  ): Promise<Count> {
    return this.cellphonesRepository.updateAll(cellphones, where);
  }

  @get('/cellphones/{id}', {
    responses: {
      '200': {
        description: 'Cellphones model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cellphones, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cellphones, {exclude: 'where'}) filter?: FilterExcludingWhere<Cellphones>
  ): Promise<Cellphones> {
    return this.cellphonesRepository.findById(id, filter);
  }

  @patch('/cellphones/{id}', {
    responses: {
      '204': {
        description: 'Cellphones PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cellphones, {partial: true}),
        },
      },
    })
    cellphones: Cellphones,
  ): Promise<void> {
    await this.cellphonesRepository.updateById(id, cellphones);
  }

  @put('/cellphones/{id}', {
    responses: {
      '204': {
        description: 'Cellphones PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cellphones: Cellphones,
  ): Promise<void> {
    await this.cellphonesRepository.replaceById(id, cellphones);
  }

  @del('/cellphones/{id}', {
    responses: {
      '204': {
        description: 'Cellphones DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cellphonesRepository.deleteById(id);
  }
}

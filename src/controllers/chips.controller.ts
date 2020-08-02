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
import {Chips} from '../models';
import {ChipsRepository} from '../repositories';

export class ChipsController {
  constructor(
    @repository(ChipsRepository)
    public chipsRepository : ChipsRepository,
  ) {}

  @post('/chips', {
    responses: {
      '200': {
        description: 'Chips model instance',
        content: {'application/json': {schema: getModelSchemaRef(Chips)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chips, {
            title: 'NewChips',
            exclude: ['id'],
          }),
        },
      },
    })
    chips: Omit<Chips, 'id'>,
  ): Promise<Chips> {
    return this.chipsRepository.create(chips);
  }

  @get('/chips/count', {
    responses: {
      '200': {
        description: 'Chips model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Chips) where?: Where<Chips>,
  ): Promise<Count> {
    return this.chipsRepository.count(where);
  }

  @get('/chips', {
    responses: {
      '200': {
        description: 'Array of Chips model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Chips, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Chips) filter?: Filter<Chips>,
  ): Promise<Chips[]> {
    return this.chipsRepository.find(filter);
  }

  @patch('/chips', {
    responses: {
      '200': {
        description: 'Chips PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chips, {partial: true}),
        },
      },
    })
    chips: Chips,
    @param.where(Chips) where?: Where<Chips>,
  ): Promise<Count> {
    return this.chipsRepository.updateAll(chips, where);
  }

  @get('/chips/{id}', {
    responses: {
      '200': {
        description: 'Chips model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Chips, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Chips, {exclude: 'where'}) filter?: FilterExcludingWhere<Chips>
  ): Promise<Chips> {
    return this.chipsRepository.findById(id, filter);
  }

  @patch('/chips/{id}', {
    responses: {
      '204': {
        description: 'Chips PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chips, {partial: true}),
        },
      },
    })
    chips: Chips,
  ): Promise<void> {
    await this.chipsRepository.updateById(id, chips);
  }

  @put('/chips/{id}', {
    responses: {
      '204': {
        description: 'Chips PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() chips: Chips,
  ): Promise<void> {
    await this.chipsRepository.replaceById(id, chips);
  }

  @del('/chips/{id}', {
    responses: {
      '204': {
        description: 'Chips DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.chipsRepository.deleteById(id);
  }
}

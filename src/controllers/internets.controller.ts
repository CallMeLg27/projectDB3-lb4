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
import {Internets} from '../models';
import {InternetsRepository} from '../repositories';

export class InternetsController {
  constructor(
    @repository(InternetsRepository)
    public internetsRepository : InternetsRepository,
  ) {}

  @post('/internets', {
    responses: {
      '200': {
        description: 'Internets model instance',
        content: {'application/json': {schema: getModelSchemaRef(Internets)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Internets, {
            title: 'NewInternets',
            exclude: ['id'],
          }),
        },
      },
    })
    internets: Omit<Internets, 'id'>,
  ): Promise<Internets> {
    return this.internetsRepository.create(internets);
  }

  @get('/internets/count', {
    responses: {
      '200': {
        description: 'Internets model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Internets) where?: Where<Internets>,
  ): Promise<Count> {
    return this.internetsRepository.count(where);
  }

  @get('/internets', {
    responses: {
      '200': {
        description: 'Array of Internets model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Internets, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Internets) filter?: Filter<Internets>,
  ): Promise<Internets[]> {
    return this.internetsRepository.find(filter);
  }

  @patch('/internets', {
    responses: {
      '200': {
        description: 'Internets PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Internets, {partial: true}),
        },
      },
    })
    internets: Internets,
    @param.where(Internets) where?: Where<Internets>,
  ): Promise<Count> {
    return this.internetsRepository.updateAll(internets, where);
  }

  @get('/internets/{id}', {
    responses: {
      '200': {
        description: 'Internets model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Internets, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Internets, {exclude: 'where'}) filter?: FilterExcludingWhere<Internets>
  ): Promise<Internets> {
    return this.internetsRepository.findById(id, filter);
  }

  @patch('/internets/{id}', {
    responses: {
      '204': {
        description: 'Internets PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Internets, {partial: true}),
        },
      },
    })
    internets: Internets,
  ): Promise<void> {
    await this.internetsRepository.updateById(id, internets);
  }

  @put('/internets/{id}', {
    responses: {
      '204': {
        description: 'Internets PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() internets: Internets,
  ): Promise<void> {
    await this.internetsRepository.replaceById(id, internets);
  }

  @del('/internets/{id}', {
    responses: {
      '204': {
        description: 'Internets DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.internetsRepository.deleteById(id);
  }
}

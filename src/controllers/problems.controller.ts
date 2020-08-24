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
import {Problems} from '../models';
import {ProblemsRepository} from '../repositories';

export class ProblemsController {
  constructor(
    @repository(ProblemsRepository)
    public problemsRepository : ProblemsRepository,
  ) {}

  @post('/problems', {
    responses: {
      '200': {
        description: 'Problems model instance',
        content: {'application/json': {schema: getModelSchemaRef(Problems)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Problems, {
            title: 'NewProblems',
            exclude: ['id'],
          }),
        },
      },
    })
    problems: Omit<Problems, 'id'>,
  ): Promise<Problems> {
    return this.problemsRepository.create(problems);
  }

  @get('/problems/count', {
    responses: {
      '200': {
        description: 'Problems model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Problems) where?: Where<Problems>,
  ): Promise<Count> {
    return this.problemsRepository.count(where);
  }

  @get('/problems', {
    responses: {
      '200': {
        description: 'Array of Problems model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Problems, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Problems) filter?: Filter<Problems>,
  ): Promise<Problems[]> {
    return this.problemsRepository.find(filter);
  }

  @patch('/problems', {
    responses: {
      '200': {
        description: 'Problems PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Problems, {partial: true}),
        },
      },
    })
    problems: Problems,
    @param.where(Problems) where?: Where<Problems>,
  ): Promise<Count> {
    return this.problemsRepository.updateAll(problems, where);
  }

  @get('/problems/{id}', {
    responses: {
      '200': {
        description: 'Problems model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Problems, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Problems, {exclude: 'where'}) filter?: FilterExcludingWhere<Problems>
  ): Promise<Problems> {
    return this.problemsRepository.findById(id, filter);
  }

  @patch('/problems/{id}', {
    responses: {
      '204': {
        description: 'Problems PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Problems, {partial: true}),
        },
      },
    })
    problems: Problems,
  ): Promise<void> {
    await this.problemsRepository.updateById(id, problems);
  }

  @put('/problems/{id}', {
    responses: {
      '204': {
        description: 'Problems PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() problems: Problems,
  ): Promise<void> {
    await this.problemsRepository.replaceById(id, problems);
  }

  @del('/problems/{id}', {
    responses: {
      '204': {
        description: 'Problems DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.problemsRepository.deleteById(id);
  }
}

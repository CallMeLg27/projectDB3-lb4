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
import {Suggestions} from '../models';
import {SuggestionsRepository} from '../repositories';

export class SuggestionsController {
  constructor(
    @repository(SuggestionsRepository)
    public suggestionsRepository : SuggestionsRepository,
  ) {}

  @post('/suggestions', {
    responses: {
      '200': {
        description: 'Suggestions model instance',
        content: {'application/json': {schema: getModelSchemaRef(Suggestions)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suggestions, {
            title: 'NewSuggestions',
            exclude: ['id'],
          }),
        },
      },
    })
    suggestions: Omit<Suggestions, 'id'>,
  ): Promise<Suggestions> {
    return this.suggestionsRepository.create(suggestions);
  }

  @get('/suggestions/count', {
    responses: {
      '200': {
        description: 'Suggestions model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Suggestions) where?: Where<Suggestions>,
  ): Promise<Count> {
    return this.suggestionsRepository.count(where);
  }

  @get('/suggestions', {
    responses: {
      '200': {
        description: 'Array of Suggestions model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Suggestions, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Suggestions) filter?: Filter<Suggestions>,
  ): Promise<Suggestions[]> {
    return this.suggestionsRepository.find(filter);
  }

  @get('/suggestions/mostScored', {
    responses: {
      '200': {
        description: 'Sugerencia mas puntuada',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Suggestions, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async mostScored(
    @param.filter(Suggestions) filter?: Filter<Suggestions>,
  ): Promise<Suggestions> {
     return (this.suggestionsRepository.dataSource.connector as any)
    .collection("Suggestions")
    .aggregate([
    {$project:{_id:0,SuggestionId:1,score:1}},
    {$sort:{score:-1}},
    {$limit:1}])
    .get();
  }

  @patch('/suggestions', {
    responses: {
      '200': {
        description: 'Suggestions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suggestions, {partial: true}),
        },
      },
    })
    suggestions: Suggestions,
    @param.where(Suggestions) where?: Where<Suggestions>,
  ): Promise<Count> {
    return this.suggestionsRepository.updateAll(suggestions, where);
  }

  @get('/suggestions/{id}', {
    responses: {
      '200': {
        description: 'Suggestions model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Suggestions, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Suggestions, {exclude: 'where'}) filter?: FilterExcludingWhere<Suggestions>
  ): Promise<Suggestions> {
    return this.suggestionsRepository.findById(id, filter);
  }

  @patch('/suggestions/{id}', {
    responses: {
      '204': {
        description: 'Suggestions PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suggestions, {partial: true}),
        },
      },
    })
    suggestions: Suggestions,
  ): Promise<void> {
    await this.suggestionsRepository.updateById(id, suggestions);
  }

  @put('/suggestions/{id}', {
    responses: {
      '204': {
        description: 'Suggestions PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() suggestions: Suggestions,
  ): Promise<void> {
    await this.suggestionsRepository.replaceById(id, suggestions);
  }

  @del('/suggestions/{id}', {
    responses: {
      '204': {
        description: 'Suggestions DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.suggestionsRepository.deleteById(id);
  }
}

import {Entity, model, property} from '@loopback/repository';

@model()
export class Suggestions extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  suggestionId: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    default: 0,
  })
  image?: string;

  constructor(data?: Partial<Suggestions>) {
    super(data);
  }
}

export interface SuggestionsRelations {
  // describe navigational properties here
}

export type SuggestionsWithRelations = Suggestions & SuggestionsRelations;

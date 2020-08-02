import {Entity, model, property} from '@loopback/repository';

@model()
export class Chips extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  chipId: string;

  @property({
    type: 'string',
    required: true,
  })
  plan: string;

  @property({
    type: 'string',
    required: true,
  })
  provider: string;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  @property({
    type: 'string',
    required: true,
  })
  number: string;

  @property({
    type: 'string',
    required: true,
  })
  dni_user: string;


  constructor(data?: Partial<Chips>) {
    super(data);
  }
}

export interface ChipsRelations {
  // describe navigational properties here
}

export type ChipsWithRelations = Chips & ChipsRelations;

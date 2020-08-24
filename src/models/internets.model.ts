import {Entity, model, property} from '@loopback/repository';

@model()
export class Internets extends Entity {
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
  internetId: number;

  @property({
    type: 'number',
    required: true,
  })
  speed: number;

  @property({
    type: 'number',
    required: true,
  })
  upload_speed: number;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;


  constructor(data?: Partial<Internets>) {
    super(data);
  }
}

export interface InternetsRelations {
  // describe navigational properties here
}

export type InternetsWithRelations = Internets & InternetsRelations;

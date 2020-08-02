import {Entity, model, property} from '@loopback/repository';

@model()
export class Cellphones extends Entity {
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
  cellphoneId: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
    required: true,
  })
  quality: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'string',
    default: "Sin descripcion",
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
  })
  os: string;

  @property({
    type: 'string',
    required: true,
  })
  memory: string;


  constructor(data?: Partial<Cellphones>) {
    super(data);
  }
}

export interface CellphonesRelations {
  // describe navigational properties here
}

export type CellphonesWithRelations = Cellphones & CellphonesRelations;

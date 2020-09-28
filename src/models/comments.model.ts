import {Entity, model, property} from '@loopback/repository';

@model()
export class Comments extends Entity {
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
  commentaryId: number;

  @property({
    type: 'number',
    required: true,
  })
  problemId: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'number',
    required: true,
  })
  score: number;

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

  @property({
    type: 'array',
    itemType: 'number',
  })
  usersWhoLike?: number[];

  @property({
    type: 'array',
    itemType: 'number',
  })
  usersWhoDislike?: number[];

  constructor(data?: Partial<Comments>) {
    super(data);
  }
}

export interface CommentsRelations {
  // describe navigational properties here
}

export type CommentsWithRelations = Comments & CommentsRelations;

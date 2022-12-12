import {getRepository, Repository} from "typeorm";
import { Comment } from '../models'

export interface ICommentPayload {
  content: string;
  userId: number;
  postId: number;
}

export const getComments  = async (_repository: Repository<Comment>): Promise<Array<Comment>> => {
  return _repository.find();
}

export const createComment  = async (_repository: Repository<Comment>, payload: ICommentPayload) :Promise<Comment> => {
  const comment = new Comment();
  return _repository.save({
    ...comment,
    ...payload
  });
}

export const getComment  = async (_repository: Repository<Comment>, id: number) :Promise<Comment | null> => {
  const comment = await _repository.findOne({where: { id: id }});
  if (!comment) return null;
  return comment;
}
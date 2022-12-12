import { Repository } from "typeorm";
import { Post } from '../models'

export interface IPostPayload {
  title: string;
  content: string;
  userId: number;
}

export const getPosts  = async (repository: Repository<Post>) : Promise<Array<Post>> => {
  return repository.find()
}

export const createPost  = async (repository: Repository<Post>, payload: IPostPayload) :Promise<Post> => {
  const post = new Post()
  return repository.save({
    ...post,
    ...payload
  })
}

export const getPost  = async (repository: Repository<Post>, id: number) :Promise<Post | null> => {
  const post = await repository.findOne({ where: { id: id }})
  if (!post) return null
  return post
}
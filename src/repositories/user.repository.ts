import {getRepository, Repository} from "typeorm";
import {User} from '../models'
   
export interface IUserPayload {
  firstName: string;                                                                      
  lastName: string;
  email: string
}

export const getUsers  = async (_repository: Repository<User>): Promise<Array<User>> => {
  return _repository.find()
}

export const createUser  = async (_repository: Repository<User>, payload: IUserPayload) :Promise<User> => {
  const user = new User()
  return _repository.save({
    ...user,
    ...payload
  })
}

export const getUser  = async (_repository: Repository<User>, id: number) :Promise<User | null> => {
  const user = await _repository.findOne({ where: {id: id}})
  if (!user) return null
  return user
}

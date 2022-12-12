import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getRepository, Repository } from "typeorm";
import {User} from '../models'
import {getUsers, createUser, IUserPayload, getUser} from '../repositories/user.repository'

@Route("users")
@Tags("User")
export default class UserController {
  protected _repository: Repository<User>;

  constructor() {
    this._repository = getRepository(Post);
  }

  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers(this._repository)
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    return createUser(this._repository, body)
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return getUser(this._repository, Number(id))
  }
}
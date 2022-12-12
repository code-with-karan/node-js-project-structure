import { Get, Route, Tags, Post as PostMethod, Body, Path } from "tsoa";
import { getRepository, Repository } from "typeorm";
import { Post } from '../models';
import { createPost, getPosts, IPostPayload, getPost } from "../repositories/post.repository";

@Route("posts")
@Tags("Post")
export default class PostController {

  protected _repository: Repository<Post>;

  constructor() {
    this._repository = getRepository(Post);
  }
  
  @Get("/")
  public async getPosts(): Promise<Array<Post>> {
    return getPosts(this._repository);
  }

  @PostMethod("/")
  public async createPost(@Body() body: IPostPayload): Promise<Post> {
    return createPost(this._repository, body)
  }

  @Get("/:id")
  public async getPost(@Path() id: string): Promise<Post | null> {
    return getPost(this._repository, Number(id))
  }
}
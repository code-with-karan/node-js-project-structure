import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getComments, ICommentPayload, createComment, getComment } from "../repositories/comment.repository";
import { Comment } from '../models';
import { getRepository, Repository } from "typeorm";

@Route("comments")
@Tags("Comment")
export default class CommentController {
  
  protected _repository: Repository<Comment>;

  constructor() {
    this._repository = getRepository(Comment);
  }

  @Get("/")
  public async getComments(): Promise<Array<Comment>> {
    return getComments(this._repository);
  }

  @Post("/")
  public async createComment(@Body() body: ICommentPayload): Promise<Comment> {
    return createComment(this._repository, body)
  }

  @Get("/:id")
  public async getComment(@Path() id: string): Promise<Comment | null> {
    return getComment(this._repository, Number(id))
  }
}
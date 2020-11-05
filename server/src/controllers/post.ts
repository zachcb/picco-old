// import { Context } from "koa";
import {
  Get,
  JsonController,
  Param,
  Post,
  Delete,
  Body,
} from "routing-controllers";
import { getRepository, getCustomRepository } from "typeorm";
// import { InjectRepository } from "typeorm-typedi-extensions";
import { PostRepository } from "../database/repositories/post";
import { PostModel } from "../database/models/post";
import { Controller } from "../bin/types/bases/controller";
import { database } from "../server"

@JsonController("/posts")
export class PostController extends Controller {
    private postRepository: PostRepository

    constructor(

    ) {
      super();

      this.initialize()
    }

    async initialize() {

      const connection = database.connection;
      // console.log("here", connection)
      this.postRepository = connection.getCustomRepository(PostRepository)
    }

  // async get(req: Request, res: Response, next: Function) {
  //   try {
  //     const repository = getCustomRepository(PostRepository);
  //     res.locals.data = await repository.one(req.params.userId);
  //     next();
  //   } catch (e) {
  //     // next( checkMySQLError( e ) );
  //   }
  // }

    @Get("")
    async all(): Promise<PostModel[]> {
        // console.log(this.postRepository)
        await this.initialize()
        return this.postRepository.getAllPosts();
    }

    @Get("/:id")
    async one(@Param("id") id: number) {
        return this.postRepository.getPostById(id);
    }

    @Post("")
    async post(@Body() post: PostModel) {
        return this.postRepository.setPost(post);
    }

    @Delete("/:id")
    async delete(@Param("id") id: number) {
        return this.postRepository.removePost(id);
    }

}

import {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  Ctx,
  Int
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { UserModel } from "../database/models/user";
import { PostModel } from "../database/models/post";

@Resolver(of => UserModel)
class UserResolver {
  constructor(
    @InjectRepository(UserModel) private readonly userRepository: Repository<UserModel>,
    @InjectRepository(PostModel) private readonly postRepository: Repository<PostModel>,
  ) {}

  @Query(returns => UserModel, { nullable: true })
  async user(@Arg("userId", type => Int) userId: number) {
    return this.userRepository.findOne(userId);
  }

  @Query(returns => [UserModel])
  async users(): Promise<UserModel[]> {
    return this.userRepository.find();
  }
}

export { UserResolver }

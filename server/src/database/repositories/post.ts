import { Repository, EntityRepository, getRepository } from "typeorm";
import Moment from "moment-timezone";
import _ from "lodash"
import { badRequest, notFound, unauthorized } from "boom";
import { PostModel } from "../models/post";
import {Service} from "typedi";

// @Service()
@EntityRepository(PostModel)
export class PostRepository extends Repository<PostModel> {
  constructor() {
    super();
  }
  private posts = [
    new PostModel({ id: 1, name: 'post #1' }),
    new PostModel({ id: 2, name: 'post #2' }),
    new PostModel({ id: 3, name: 'post #3' }),
    new PostModel({ id: 4, name: 'post #4' }),
];

  /**
   * @description Get one post
   *
   * @param {number} id - The id of post
   *
   */
  // async one(id: number) {

  //   const repository = await getRepository(PostModel);
  //   const options = _.omitBy({ id }, _.isNil);

  //   const post = await repository.findOne({
  //     where: options
  //   });

  //   if (!post) {
  //     throw notFound('post not found');
  //   }

  //   return new PostModel(post);
  // }

  public async getAllPosts(): Promise<PostModel[] | undefined> {
    // here, for example you can load categories using mongoose
    // you can also return a promise here
    // simulate async with creating an empty promise
    // console.log(getRepository(PostModel))

    return this.find();
  }

  public async getPostById(id: number): Promise<PostModel | undefined> {
    // here, for example you can load categories using mongoose
    // you can also return a promise here
    // simulate async with creating an empty promise
    return this.findOne(id);
  }

  public async setPost(post: PostModel): Promise<PostModel | undefined> {
    return this.save(post);
  }

  public async removePost(id: number): Promise<PostModel | undefined> {
    return this.remove(new PostModel({ id }));
  }

  // findOne(id: number) {
  //     // here, for example you can load post id using mongoose
  //     // you can also return a promise here
  //     let foundPost: PostModel = undefined;
  //     this.posts.forEach(post => {
  //         if (post.id === id)
  //             foundPost = post;
  //     });
  //     return foundPost;
  // }

  // save(post: PostModel) {
  //   // here, for example you can save a post to mongodb using mongoose
  //   this.posts.push(post);
  //   return post;
  // }

  // remove(id: number) {
  //     // here, for example you can save a post to mongodb using mongoose
  //     const post = this.findOne(id);
  //     if (post)
  //         this.posts.splice(this.posts.indexOf(post), 1);

  //     return post;
  // }
}

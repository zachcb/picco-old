
import { Field, ID, ObjectType } from "type-graphql";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

import { PostModel } from "./post";

@ObjectType()
@Entity()
class UserModel {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Column()
  password: string;

  @OneToMany(type => PostModel, post => post.user, { lazy: true })
  @Field(type => [PostModel])
  posts: PostModel;
}

export { UserModel };

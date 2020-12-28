import { ObjectType, Field, ID } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  CreateDateColumn
} from "typeorm";
import { MaxLength } from "class-validator";

import { UserModel } from "./user";

@Entity()
@ObjectType()
class PostModel {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Field()
  @Column({ unique: true })
  @MaxLength(120)
  public name: string;

  @Field(type => UserModel)
  @ManyToOne(type => UserModel, { lazy: true })
  user: UserModel;

  @Field()
  @CreateDateColumn()
  public createdAt?: Date;

  @Field()
  @CreateDateColumn()
  public updatedAt?: Date;

  @Field()
  @CreateDateColumn()
  public deletedAt?: Date;
}

export { PostModel };

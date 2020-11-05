import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Moment from "moment-timezone";

import { Modelize as ModelizeInterface } from "../../bin/types/interfaces/Modelize";


@Entity()
export class PostModel {
  constructor(payload: object) {
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 120,
    unique: true,
  })
  public name: string;

  @Column({
    type: Date,
    default: Moment( new Date() ).format('YYYY-MM-DD HH:ss')
  })
  public createdAt?: Date;

  @Column({
    type: Date,
    default: null
  })
  public updatedAt?: Date;

  @Column({
    type: Date,
    default: null,
  })
  public deletedAt?: Date;
}

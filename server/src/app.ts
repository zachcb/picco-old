import "reflect-metadata";

import Koa from 'koa';
import koaBody from 'koa-body';
import koaHelmet from 'koa-helmet';
import cors from '@koa/cors';
import { ApolloServer } from "apollo-server-koa";
import { createKoaServer, KoaDriver, useContainer } from "routing-controllers";
import { Container, Service } from "typedi";
import { config } from './config';
// import { routes, allowedMethods } from './router';

import { Database } from './database';
import { PostController } from './controllers/post';

const database = Container.get(Database);

import { buildSchema } from "type-graphql";

import { PostResolver } from "./resolvers/PostResolver";
import { UserResolver }from "./resolvers/UserResolver";

@Service()
export class App {
  private instance: Koa;

  public constructor() {
    useContainer(Container);

    // const app = createKoaServer({
    //   development: !config.PRODUCTION,
    //   routePrefix: "/api",
    //   controllers: [
    //     PostController
    //   ],
    //   validation: { validationError: { target: false } },
    // });

    const schema = buildSchema({
      resolvers: [PostResolver, UserResolver],
      container: Container,
    });

    const app = new ApolloServer({
      schema,
    })

    app.use(koaBody());
    app.use(koaHelmet());
    app.use(cors());
    // app.use(routes);
    // app.use(allowedMethods);

    this.instance = app;
  }

  public get(): Koa {
    return this.instance;
  }
}



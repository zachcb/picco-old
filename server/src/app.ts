import Koa from 'koa';
import koaBody from 'koa-body';
import koaHelmet from 'koa-helmet';
import cors from '@koa/cors';

// TODO: Remove?
import "reflect-metadata";

import serve from 'koa-static';
// import koaValidator from 'koa-async-validator';
import * as swagger from 'swagger2';
// import { ui } from "swagger2-koa";
// import koaBunyanLogger from 'koa-bunyan-logger';
import {createKoaServer, KoaDriver, useContainer} from "routing-controllers";
import {Container, Service} from "typedi";
import { config } from './config';
import { routes, allowedMethods } from './router';
// import { logger } from './utils/logger';
import { Database } from './database';
import { PostController } from './controllers/post';
const database = Container.get(Database);
// st app = new Koa();
// const swaggerDocument: any = swagger.loadDocumentSync("./swagger.yml");


// database.initialize().then(connection => {
//   app.use(koaBody());
//   app.use(koaHelmet());
//   // app.use(koaValidator());
//   app.use(cors());
//   // app.use(koaBunyanLogger(logger));
//   // app.use(koaBunyanLogger.requestLogger());
//   // app.use(koaBunyanLogger.timeContext());
//   app.use(routes);
//   app.use(allowedMethods);

//   // app.use(
//   //   ui(swaggerDocument, "/swagger")
//   //   // koaSwagger({
//   //   //   routePrefix: '/swagger',
//   //   //   swaggerOptions: {
//   //   //     url: '/swagger.yml'
//   //   //   }
//   //   // })
//   // );

// }).catch((error) => {
//   console.log("Could not connect to database.")
//   console.error(error);
// });

@Service()
export class App {
  private instance: Koa;

  public constructor() {
    useContainer(Container);
    const app = createKoaServer({
      development: !config.PRODUCTION,
      routePrefix: "/api",
      controllers: [
        PostController
      ],
      validation: { validationError: { target: false } },
    });
    app.use(koaBody());
    app.use(koaHelmet());
    app.use(cors());
    app.use(routes);
    app.use(allowedMethods);

    this.instance = app;
  }

  public get(): Koa {
    return this.instance;
  }
}



import path from "path";
// import Router from 'koa-router';
import { SwaggerRouter } from 'koa-swagger-decorator'

const router = new SwaggerRouter();

/**
 * Base route, return a 401
 */
router.get('/', async ctx => ctx.status = 401);

/**
 * Basic healthcheck
 */
router.get('/healthcheck', async ctx => ctx.body = 'OK');

// swagger docs avaliable at http://localhost:3000/api/swagger-html
router.swagger({
  title: 'Example Server',
  description: 'API DOC',
  version: '1.0.0',

  // [optional] default is root path.
  // if you are using koa-swagger-decorator within nested router, using this param to let swagger know your current router point
  prefix: '/api',

  // [optional] default is /swagger-html
  swaggerHtmlEndpoint: '/swagger-html',

  // [optional] default is /swagger-json
  swaggerJsonEndpoint: '/swagger-json',

  // [optional] additional options for building swagger doc
  // eg. add api_key as shown below
  swaggerOptions: {
    securityDefinitions: {
      api_key: {
        type: 'apiKey',
        in: 'header',
        name: 'api_key',
      },
    },
  },
  // [optional] additional configuration for config how to show swagger view
  swaggerConfiguration: {
    display: {
      defaultModelsExpandDepth: 4, // The default expansion depth for models (set to -1 completely hide the models).
      defaultModelExpandDepth: 3, // The default expansion depth for the model on the model-example section.
      docExpansion: 'list', // Controls the default expansion setting for the operations and tags.
      defaultModelRendering: 'model' // Controls how the model is shown when the API is first rendered.
    }
  }
})

// mapDir will scan the input dir, and automatically call router.map to all Router Class
router.mapDir(path.resolve(__dirname), {
  // default: true. To recursively scan the dir to make router. If false, will not scan subroutes dir
  // recursive: true,
  // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
  // doValidation: true,
  // default: [], paths to ignore while looking for decorators
  // ignore: ["**.spec.ts"],
})

export const routes = router.routes();
export const allowedMethods = router.allowedMethods();

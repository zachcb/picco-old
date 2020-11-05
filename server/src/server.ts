import { App } from "./app"
import { config } from './config';
import {Container, Service} from "typedi";
import { Database } from './database';
export const database = Container.get(Database);
const app = Container.get(App).get();

database.connect().then(async connection => {
  await app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
    console.log("--> Press CTRL-C to stop\n");
  });
}).catch((error) => {
  console.log("Could not connect to database.")
  console.error(error);
});

// const server = app.listen(config.PORT, () => {
//   console.log(`Server running on port ${config.PORT}`);
//   console.log("--> Press CTRL-C to stop\n");
// });

// export const database;
export default app;

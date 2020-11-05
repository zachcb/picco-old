import { Container, Service } from "typedi";
import {
  Connection,
  createConnection,
  useContainer
} from "typeorm";

import { config } from "../config";
import { Database as DatabaseInterface } from "../bin/types/interfaces/Database";
import { ConnectionSecure } from "../bin/decorators/ConnectionSecure";

@Service()
@ConnectionSecure(["connect"])
export class Database implements DatabaseInterface {
  public connection : Connection;

  public async connect(): Promise<Connection> {
    if (this.connection) {
      await this.connection.connect();
      return this.connection;
    }

    useContainer(Container);

    this.connection = await createConnection(
    //   {
    //   name: config.PG_NAME,
    //   type: "postgres",
    //   host: config.PG_HOST,
    //   database: config.PG_DATABASE,
    //   port: config.PG_PORT,
    //   username: config.PG_USER,
    //   password: config.PG_PASSWORD,
    //   ssl: config.PRODUCTION,
    //   synchronize: true,
    //   logging: !config.PRODUCTION,
    //   entities: ['database/models/*.{js,ts}'],
    // }
    );

    return this.connection;
  }

  public async disconnect(): Promise<void> {
    if (this.connection.isConnected) {
      await this.connection.close();
    }
  }

  public async executeSQL(sql: string, ...params: any[]): Promise<any> {
    return this.connection.createQueryRunner().query(sql, params);
  }

  public async reset() {
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
  }

  public async runMigrations() {
    await this.connection.runMigrations();
  }

  public async dropDatabase() {
    await this.connection.dropDatabase();
  }
}


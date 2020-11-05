import { getConnection, Connection } from "typeorm";
import { config } from "../../../config";

/**
 * Main controller contains properties/methods
 */
export abstract class Controller {

  /**
   * @description TypeORM current database connection
   */
  protected connection : Connection;

  constructor() {
    this.connection = getConnection(config.PG_NAME);
  }
};

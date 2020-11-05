import { Connection } from "typeorm";

/**
 * Define required members for Model's
 */
interface Database {
  connect(): Promise<Connection>;
  disconnect(): Promise<void>;
  executeSQL(sql: string, ...params: any[]): Promise<any>;
  reset(): any;
}

export { Database };

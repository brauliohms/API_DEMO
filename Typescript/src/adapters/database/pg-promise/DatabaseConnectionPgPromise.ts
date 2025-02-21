import pgp, { IDatabase } from "pg-promise";

export interface DatabaseConnection {
  query<DataQuery>(statement: string, params?: unknown): Promise<DataQuery>;
  close(): Promise<void>;
}

export class PgPromiseAdapter implements DatabaseConnection {
  connection: IDatabase<object>;

  constructor() {
    this.connection = pgp()("postgres://usuario:123456@localhost:5433/app");
  }

  async query<DataQuery>(
    statement: string,
    params?: unknown
  ): Promise<DataQuery> {
    return this.connection?.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection?.$pool.end();
  }
}

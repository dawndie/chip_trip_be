import dotenv from "dotenv";
import path from "path";
import { createConnection, Connection } from "typeorm";

const initEnvironments = (): void => {
  dotenv.config({
    path: path.join(process.cwd(), "environments", ".env.common"),
  });
  dotenv.config({
    path: path.join(
      process.cwd(),
      "environments",
      `.env.${process.env.NODE_ENV}`,
    ),
  });
};

const initMysqlConnection = async (): Promise<Connection> => {
  const connection = await createConnection({
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_TCP_PORT) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  return connection;
};

export { initEnvironments, initMysqlConnection };

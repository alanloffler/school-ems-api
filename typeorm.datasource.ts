import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin1234",
  database: "school_ems",
  entities: ["src/**/*.entity.ts"],
  migrations: ["migrations/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
});

import { User } from '../src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOption);

export default dataSource;

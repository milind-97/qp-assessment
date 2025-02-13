import { DataSource,DataSourceOptions } from "typeorm";
import {config} from 'dotenv'
config()
export const dataSourceOptions: DataSourceOptions={
  type: 'postgres',
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  // type: 'postgres',
  host: 'postgres',  // Use the service name defined in docker-compose.yml
  port: 5432,
  username: 'nestuser',
  password: 'nestpassword',
  database: 'nestdb',
  synchronize: true,
  // autoLoadEntities: true,
  entities:['dist/**/*.entity{.ts,.js}'],
  migrations:['dist/db/migrations/*{.ts,.js}'],
  logging: false,
  // synchronize: false,

}
const dataSource = new DataSource(dataSourceOptions)

export default dataSource
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

require('dotenv').config();
const sequelizeConfig: SequelizeModuleOptions = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
  logging: false,
  sync: {
    force: false, // WARNING !!!! INI KALAU TRUE AKAN BIKIN ULANG TABEL TIAP REFRESH !!!!
    alter: { drop: true }
  },
  define: {
    timestamps: true,
    underscored: true,
  },
};

export default sequelizeConfig;

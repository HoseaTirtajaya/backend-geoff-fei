import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize';
import sequelizeConfig from 'src/config/db.config';

@Injectable()
export class OrderService {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(sequelizeConfig);
  }


  async getHello(): Promise<any> {
    try {
      console.log(sequelizeConfig)
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      return true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return false;
    }
  }
}

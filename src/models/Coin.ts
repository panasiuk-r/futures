import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import { sequelize } from '../database/connection';

class Coin extends Model<InferAttributes<Coin>, InferCreationAttributes<Coin>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: number;
}

Coin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  },
  {
    tableName: 'coin',
    sequelize
  }
)

export default Coin
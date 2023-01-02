'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user,{foreignKey: "userIdx", targetKey: "userIdx"});
    }
  }
  laundry.init({
    laundryIdx: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userIdx: DataTypes.INTEGER,
    address: DataTypes.STRING,
    picture: DataTypes.STRING,
    request: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'laundry',
  });
  return laundry;
};
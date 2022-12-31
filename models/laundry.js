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
      // define association here
      this.belongsTo(models.user,{foreignKey: "userId", targetKey: "userId"});
    }
  }
  laundry.init({
    laundryIdx: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.STRING,
    address: DataTypes.STRING,
    picture: DataTypes.STRING,
    request: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'laundry',
  });
  return laundry;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class laundry_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.laundry,{foreignKey: "laundryIdx", targetKey: "laundryIdx"});
    }
  }
  laundry_status.init({
    laundryIdx: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    status: DataTypes.STRING,
    ownerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'laundry_status',
  });
  return laundry_status;
};
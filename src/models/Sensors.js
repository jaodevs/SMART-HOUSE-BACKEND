const { Model, DataTypes } = require("sequelize");

class Sensors extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        value: DataTypes.INTEGER,
        type: DataTypes.STRING
      },
      {
        sequelize,
        tableName: "sensors",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.RoomsOfHouses, {
      foreignKey: "roomid",
      as: "roomOfHouse",
    });
  }
}

module.exports = Sensors;

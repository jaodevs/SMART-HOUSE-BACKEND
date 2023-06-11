const { Model, DataTypes } = require("sequelize");

class Immobile extends Model {
  static init(sequelize) {
    super.init(
      {
        Addresses: DataTypes.STRING,
        numberOfRooms: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: "immobile",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: "clientid", as: "client" });
  }
}

module.exports = Immobile;

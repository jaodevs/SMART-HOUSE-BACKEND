const { Model, DataTypes } = require("sequelize");

class Immobile extends Model {
  static init(sequelize) {
    super.init(
      {
        Addresses: DataTypes.STRING,
        number_Of_Rooms: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: "immobile",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: "clientId", as: "client" });
  }
}

module.exports = Immobile;

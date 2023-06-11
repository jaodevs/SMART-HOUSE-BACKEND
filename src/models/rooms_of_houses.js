const { Model, DataTypes } = require("sequelize");

class RoomsOfHouses extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "rooms_of_houses",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Immobile, {
      foreignKey: "immobileid",
      as: "immobile",
    });
  }
}

module.exports = RoomsOfHouses;

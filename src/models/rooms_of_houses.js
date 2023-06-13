const { Model, DataTypes } = require("sequelize");

class RoomsOfHouses extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        immobile_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "immobile",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "rooms_of_houses",
      }
    );
  }
}

module.exports = RoomsOfHouses;

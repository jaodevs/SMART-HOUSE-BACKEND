const { Model, DataTypes } = require("sequelize");

class Immobile extends Model {
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
        addresses: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        numberofrooms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        client_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "client",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "immobile",
      }
    );
  }
}

module.exports = Immobile;

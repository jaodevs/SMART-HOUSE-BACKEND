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

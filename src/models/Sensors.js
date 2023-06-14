const { Model, DataTypes } = require("sequelize");

class Sensors extends Model {
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
        value:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        room_Id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "rooms_of_houses",
            key: "id",
          },
          field: "room_Id",
        },
      },
      {
        sequelize,
        tableName: "sensors",
      }
    );
  }
}

module.exports = Sensors;

const { Model, DataTypes } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "client",
      }
    );
  }
}

module.exports = Client;

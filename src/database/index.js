const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Client = require('../models/Client');
const Immobile = require('../models/Immobile');
const rooms_of_houses = require('../models/rooms_of_houses');
const Sensors = require('../models/Sensors');

const connection = new Sequelize(dbConfig);


rooms_of_houses.init(connection);
Immobile.init(connection);
Client.init(connection);
Sensors.init(connection);


Immobile.associate(connection.models);
// rooms_of_houses.associate(connection.models);
Sensors.associate(connection.models);

module.exports = connection;

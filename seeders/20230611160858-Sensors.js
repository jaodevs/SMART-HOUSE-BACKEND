"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const batchSize = 500;
    const sensorTypes = ["Sensor de Chuva", "Sensor de Gás", "Sensor de Solo"];

    const roomsOfHouses = await queryInterface.sequelize.query(
      "SELECT id FROM rooms_of_houses;"
    );
    const roomIds = roomsOfHouses[0].map((room) => room.id);

    for (const roomId of roomIds) {
      const sensors = [];

      for (let i = 0; i < 10; i++) {
        if (sensors.length >= 300) {
          await insertSensorsInBatch(queryInterface, sensors);
          sensors.length = 0;
        }

        if (sensors.length >= 300) {
          break;
        }

        const sensorType = getRandomSensorType(sensorTypes);

        const sensor = {
          id: uuidv4(),
          name: generateSensorName(sensorType),
          value: generateArduinoSensorValue(sensorType),
          type: sensorType,
          room_Id: roomId,
          created_at: new Date(),
          updated_at: new Date(),
        };

        sensors.push(sensor);

        if (sensors.length >= batchSize) {
          await insertSensorsInBatch(queryInterface, sensors);
          sensors.length = 0; 
        }
      }

      if (sensors.length > 0) {
        await insertSensorsInBatch(queryInterface, sensors);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sensors", null, {});
  },
};

function generateSensorName(sensorType) {
  const sensorNames = {
    "Sensor de Chuva": ["Sensor Chuva 1", "Sensor Chuva 2", "Sensor Chuva 3"],
    "Sensor de Gás": ["Sensor Gás 1", "Sensor Gás 2", "Sensor Gás 3"],
    "Sensor de Solo": ["Sensor Solo 1", "Sensor Solo 2", "Sensor Solo 3"],
  };

  const names = sensorNames[sensorType];
  return names[Math.floor(Math.random() * names.length)];
}

function generateArduinoSensorValue(sensorType) {
  const minValues = {
    "Sensor de Chuva": 0,
    "Sensor de Gás": 200,
    "Sensor de Solo": 300,
  };

  const maxValues = {
    "Sensor de Chuva": 1000,
    "Sensor de Gás": 10000,
    "Sensor de Solo": 2000,
  };

  const minValue = minValues[sensorType];
  const maxValue = maxValues[sensorType];

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getRandomSensorType(sensorTypes) {
  return sensorTypes[Math.floor(Math.random() * sensorTypes.length)];
}

async function insertSensorsInBatch(queryInterface, sensors) {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    const chunks = chunkArray(sensors, 100);
    for (const chunk of chunks) {
      await queryInterface.bulkInsert("sensors", chunk, { transaction });
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

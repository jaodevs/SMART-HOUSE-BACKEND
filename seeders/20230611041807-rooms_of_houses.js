'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roomsOfHouses = [];

    const immobiles = await queryInterface.sequelize.query('SELECT id FROM immobile;');

    immobiles[0].forEach(immobile => {
      const immobileId = immobile.id;

      for (let i = 0; i < 5; i++) {
        if(immobiles.length >= 300) {
          break;
        }
        roomsOfHouses.push({
          id: uuidv4(),
          name: generateRoomName(),
          immobileId: immobileId,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert('rooms_of_houses', roomsOfHouses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms_of_houses', null, {});
  }
};

function generateRoomName() {
  const roomTypes = [
    'Sala de Estar',
    'Cozinha',
    'Quarto',
    'Banheiro',
    'Sala de Estudo',
    'Sala de Jantar',
    'Escritório',
    'Quarto de Hóspedes',
    'Sala de Brinquedos',
    'Biblioteca'
  ];

  return roomTypes[Math.floor(Math.random() * roomTypes.length)];
}

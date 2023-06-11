'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const immobiles = [];

    const clients = await queryInterface.sequelize.query('SELECT id FROM client;');

    clients[0].forEach(client => {
      const clientId = client.id;

      for (let i = 0; i < 10; i++) {
        immobiles.push({
          id: uuidv4(),
          Addresses: generateBrazilianAddress(),
          numberOfRooms: Math.floor(Math.random() * 5) + 1,
          clientId: clientId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    await queryInterface.bulkInsert('immobile', immobiles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('immobile', null, {});
  }
};

function generateBrazilianAddress() {
  const streets = [
    'Rua A',
    'Avenida B',
    'Praça C',
    'Travessa D',
    'Alameda E',
    'Estrada F',
    'Rodovia G',
    'Viela H',
    'Largo I',
    'Acesso J'
  ];

  const neighborhoods = [
    'Centro',
    'Jardim',
    'Vila',
    'Bairro Novo',
    'São Pedro',
    'Santo Antônio',
    'Boa Vista',
    'Floresta',
    'Santa Cruz',
    'Liberdade'
  ];

  const cities = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Porto Alegre',
    'Salvador',
    'Brasília',
    'Curitiba',
    'Fortaleza',
    'Manaus',
    'Recife'
  ];

  const randomStreet = streets[Math.floor(Math.random() * streets.length)];
  const randomNeighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  return `${randomStreet}, ${randomNeighborhood}, ${randomCity}`;
}

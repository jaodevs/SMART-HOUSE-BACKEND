'use strict';
const { v4: uuidv4 } = require('uuid');

const names = [
  'João Silva',
  'Maria Santos',
  'Pedro Almeida',
  'Ana Pereira',
  'Carlos Oliveira',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const clients = [];

    for (let i = 0; i < 300; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const email = generateEmail(name);

      clients.push({
        id: uuidv4(),
        name: name,
        email: email,
        password: `password${i + 1}`,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('client', clients, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('client', null, {});
  }
};

// Função para gerar e-mail fictício com base no nome
function generateEmail(name) {
  const formattedName = name.replace(/\s/g, '').toLowerCase();
  const domain = 'example.com';
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return `${formattedName}${randomNumber}@${domain}`;
}

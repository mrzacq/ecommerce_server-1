'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
   let password = "123456"
   let salt = bcrypt.genSaltSync(10)
   await queryInterface.bulkInsert('Users', [{
      email: "admin@mail.com",
      password: bcrypt.hashSync(password, salt),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
   }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};

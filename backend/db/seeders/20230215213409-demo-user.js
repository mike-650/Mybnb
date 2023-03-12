'use strict';
const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'Users'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Mario',
        lastName: 'Mario',
        email: 'mario@test.com',
        username: 'mario64',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Cloud',
        lastName: 'Strife',
        email: 'cloud@test.com',
        username: 'cloud7',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Odell',
        lastName: 'Beckham Jr.',
        email: 'odell@test.com',
        username: 'odell13',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['mario64', 'cloud7', 'odell13', 'solid1']}
    }, {});
  }
};

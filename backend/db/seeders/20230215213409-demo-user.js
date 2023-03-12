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
        firstName: 'Howell',
        lastName: 'Jenkins',
        email: 'howls@castle.com',
        username: 'Howl',
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
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@email.com',
        username: 'Demo-user',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Howl', 'cloud7', 'Demo-user']}
    }, {});
  }
};

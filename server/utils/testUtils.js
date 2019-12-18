const faker = require('faker');
const { User } = require('../models');

exports.createUsers = (number = 1) => {
  let users = [];

  for (let x = 0; x < number; x++) {
    User.create({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password()
    }, (err, user) => {
      users.push(user);
    });
  }

  return users;
};
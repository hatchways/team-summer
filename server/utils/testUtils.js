const faker = require('faker');
const { User } = require('../models');

exports.createUsers = (number = 1) => {
  let users = [];

  for (let x = 0; x < number; x++) {
    const userData = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password()
    };

    User.create(userData, (err, user) => {
      if (!err) {
        users.push({_id: user._id.toString(), ...userData});
      } else {
        console.log(err)
      }
    });
  }

  return users;
};
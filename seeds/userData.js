const { User } = require('../models');

const userdata =
[
  {
    "username": "User",
    "password": "password"
  },
  {
    "username": "Sunny",
    "password": "password"
  },
  {
    "username": "Lucky",
    "password": "password"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUser;
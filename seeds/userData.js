const { User } = require('../models');

const userdata =
[
  {
    "username": "User",
    "password": "password"
  },
  {
    "username": "Ali",
    "password": "baba"
  },
  {
    "username": "Lucky",
    "password": "sunny"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUser;
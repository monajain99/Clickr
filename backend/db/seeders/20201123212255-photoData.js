'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "My Photo",
          description: "Best award photo",
          photoUrl: "www.google.com",
          userId: 1
        },
        {
          title: "My Photo1",
          description: "Best award photo",
          photoUrl: "www.google.com",
          userId: 1
        },
        {
          title: "My Photo2",
          description: "Best award photo2",
          photoUrl: "www.google.com",
          userId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        title: { [Op.in]: ["My Photo", "My Photo1", "Photo2"] },
      },
      {}
    );
  },
};

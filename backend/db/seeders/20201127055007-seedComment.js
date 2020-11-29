'use strict';

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          comment: "Best award photo",
          photoId: 2,
          userId: 1,
        },
        {
          comment: "Best award photo1",
          photoId: 80,
          userId: 1,
        },
        {
          comment: "Best award photo2",
          photoId: 84,
          userId: 1,
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Comments",
      {
        comment: {
          [Op.in]: [
            "My Best award photo",
            "My Best award photo1",
            "Best award photo2",
          ],
        },
      },
      {}
    );
  },
};
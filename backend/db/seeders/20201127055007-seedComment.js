'use strict';

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          comment: "Best award photo",
          photoId: 3,
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
          ],
        },
      },
      {}
    );
  },
};
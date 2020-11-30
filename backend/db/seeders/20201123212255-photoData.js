'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "My Photo",
          description: "Best award photo",
          photoUrl:
            "$2a$10$FaRJtHNhVUGlaDwoue/Y4er5BKeHEt41vNgSfH00vROLVI5GJ.Dbm",
          userId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Photos",
      {
        title: { [Op.in]: ["My Photo"] },
      },
      {}
    );
  },
};

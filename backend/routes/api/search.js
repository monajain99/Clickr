const router = require("express").Router();
// const { Op } = require("routes/api/node_modules/sequelize");

// const { csrfProtection, asyncHandler } = require("routes/utils");
// const db = require("routes/db/models");

// const router = express.Router();

// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { term } = req.body;
//     let questions = await db.Question.findAll({
//       where: {
//         title: {
//           [Op.iLike]: "%" + term + "%",
//         },
//       },
//     });

//     res.json({ questions });
//   })
// );

// router.post(
//   "/search",
//   asyncHandler(async (req, res) => {
//     console.log(req);
//   })
// );
module.exports = router;

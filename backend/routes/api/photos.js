const express = require("express");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { Photo, User } = require("../../db/models");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const stream = require("stream");
const cloudinary = require("cloudinary").v2;



router.get(
  "/",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const photos = await Photo.findAll({ include: User });
    res.json({ photos });
  })
);

router.get(
  "/:id",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const photoId = req.params.id;
    const photo = await Photo.findByPk(photoId, { include: User });

    res.json({ photo });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const photoId = req.params.id;
    const photoToDelete = await Photo.findByPk(photoId);
    if (!photoToDelete) {
      const err = new Error("Photo not found!");
      // err.status = 404;
      next(err);
      return;
    }

    await photoToDelete.destroy();
    res.json({ message: "success" });
  })
);

router.post(
  "/",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const { title, name, description } = req.body;
    const photo = db.Photo.build({
      title,
      description,
      name,
    });
    // console.log(title);
    const validatorErrors = validationResult(req);
    try {
      if (validatorErrors.isEmpty()) {
        await photo.save();
        res.redirect("/");
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        return errors;
      }
    } catch (err) {
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = err.errors.map((error) => error.message);
        return errors;
      } else {
        next(err);
      }
    }
  })
);



// router.post(
//   "/",
//   upload.single("image"),
//   csrfProtection,
//   questionValidators,
//   asyncHandler(async (req, res, next) => {
//     if (req.file) {
//       const { title, content } = req.body;
//       const userId = res.locals.user.id;
//       const question = db.Question.build({
//         title,
//         content,
//         userId,
//       });
//       let upload_stream = cloudinary.uploader.upload_stream(async function (
//         err,
//         result
//       ) {
//         let image = result.url;
//         question.image = result.url;
//         const validatorErrors = validationResult(req);
//         try {
//           if (validatorErrors.isEmpty()) {
//             await question.save();
//             res.redirect("/");
//             return res.send();
//           } else {
//             const errors = validatorErrors.array().map((error) => error.msg);
//             res.render("new-question", {
//               title: title,
//               content,
//               errors,
//               csrfToken: req.csrfToken(),
//             });
//             return res.send();
//           }
//         } catch (err) {
//           if (
//             err.name === "SequelizeValidationError" ||
//             err.name === "SequelizeUniqueConstraintError"
//           ) {
//             const errors = err.errors.map((error) => error.message);
//             res.render("new-question", {
//               title: "New Question",
//               question,
//               errors,
//               csrfToken: req.csrfToken(),
//             });
//             return res.send();
//           } else {
//             next(err);
//           }
//         }
//       });
//       var bufferStream = new stream.PassThrough();
//       bufferStream.end(req.file.buffer);
//       bufferStream.pipe(upload_stream);
//     } else {
//       const { title, content } = req.body;
//       const userId = res.locals.user.id;
//       const question = db.Question.build({
//         title,
//         content,
//         userId,
//       });
//       const validatorErrors = validationResult(req);
//       try {
//         if (validatorErrors.isEmpty()) {
//           await question.save();
//           res.redirect("/");
//           return res.send();
//         } else {
//           const errors = validatorErrors.array().map((error) => error.msg);
//           res.render("new-question", {
//             title: title,
//             content,
//             errors,
//             csrfToken: req.csrfToken(),
//           });
//           return res.send();
//         }
//       } catch (err) {
//         if (
//           err.name === "SequelizeValidationError" ||
//           err.name === "SequelizeUniqueConstraintError"
//         ) {
//           const errors = err.errors.map((error) => error.message);
//           res.render("new-question", {
//             title: "New Question",
//             question,
//             errors,
//             csrfToken: req.csrfToken(),
//           });
//           return res.send();
//         } else {
//           next(err);
//         }
//       }
//     }
//   })
// );

module.exports = router;

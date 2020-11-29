const express = require("express");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { Photo, User, Comment } = require("../../db/models");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const stream = require("stream");
const cloudinary = require("cloudinary").v2;

//cloud post 
router.post(
  "/",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    try {
      const { title, description, userId, photoUrl } = req.body;
      const uploadedResponse = await cloudinary.uploader.upload(photoUrl, {
        upload_preset: "clicr",
      });
      
          const photo = Photo.build({
            title,
            description,
            photoUrl: uploadedResponse.url,
            userId,
          });
          await photo.save();

      res.json({ photo });
    } catch (error) {
      console.error(error)
      res.status(500).json({ err: 'Error' })
    }
  })
)

//get from database

router.get(
  "/",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const photos = await Photo.findAll({ include: [{ all: true }] });
    res.json({ photos });
  })
);


// single get from database 
router.get(
  "/:id",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const photoId = req.params.id;
    const photo = await Photo.findByPk(photoId, { include: [{ all: true }] });
    
    res.json({ photo });
    console.log(photo.Comments[0])
 

  })
);

//  get from database by user
router.get(
  "/",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const photo = await Photo.findByUserID(userId, {
      include: User,
      include: Comment,
    });

    res.json({ photo });
  })
);

// export const findByUserID = (id) => async (dispatch) => {
//   const response = await fetch(`/api/photos/${id}`);
//   dispatch(userPhotos(response.data));
//   return response;
// };



router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const message = await Photo.removePhoto({ id });
    return res.json({
      message,
    });
  })
);

module.exports = router;

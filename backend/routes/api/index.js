const router = require("express").Router();
const sessionRouter = require("./session");
const usersRouter = require("./users");
const photoRouter = require("./photos");
const profileRouter = require("./profile");
const commentRouter = require("./comment")



router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/profile", profileRouter);

router.use("/photos", photoRouter);

router.use("/comment", commentRouter);



module.exports = router;

const express = require("express");
const router = express.Router();
const userHandler = require("../serverHandlers/userHandler");
const multer = require("multer");
const refreshTokenHandler = require('../serverHandlers/refreshTokenHandler');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });
router.get('/data', refreshTokenHandler.getUserData);
router.post("/signup", userHandler.signup);
router.post("/login", userHandler.login);

router.put("/profile/:userId", upload.single('profilePicture'), userHandler.editProfile);

router.get("/users", userHandler.get_all_users);
router.get("/:email", userHandler.UserDetails);

module.exports = router;

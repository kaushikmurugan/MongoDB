const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const {verification} = require("../middleware/jwt.config")
const Upload = require("../middleware/profile")


router.route("/registration").post(userController.UserRegistration);
router.route("/find/:id").get(userController.findUserById);
router.route("/find").get(userController.findByQuery);
router.route("/findName").get(userController.findByName);
// router.route("/findurlid/:id").get(userController.findIdUrl);
// router.route("/update/:id").put(userController.updateId);
router.route("/login").post(userController.logincontrol); 
router.route("/upload/:id").put(Upload.single("profile"),userController.fileupload);
router.route("/verify").get(verification,userController.getUserProfile);

module.exports = router;

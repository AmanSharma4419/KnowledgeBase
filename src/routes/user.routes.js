const { Router } = require("express");
const router = new Router();

const requestValidator = require("../middlewares/requestValidator.middleware");

const userController = require("../controllers/user.controller")
const userValidator = require("../validators/user.validator");


router.post("/register", requestValidator(userValidator.signUp), userController.signUp);
router.post("/login", requestValidator(userValidator.signIn), userController.signIn);
router.get("/categoryList", userController.listCategory);
router.post("/verifyOtp", requestValidator(userValidator.verifyOtp), userController.verifyOtp);

module.exports = router;

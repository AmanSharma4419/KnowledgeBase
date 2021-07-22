const { Router } = require("express");
const router = new Router();

const requestValidator = require("../middlewares/requestValidator.middleware");

const userController = require("../controllers/user.controller")
const userValidator = require("../validators/user.validator");


router.post("/register", requestValidator(userValidator.signUp), userController.signUp);
router.get("/categoryList", userController.listCategory);

module.exports = router;

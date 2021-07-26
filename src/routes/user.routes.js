const { Router } = require("express");
const router = new Router();
const { auth } = require("../middlewares/auth.middleware");
const requestValidator = require("../middlewares/requestValidator.middleware");
const userController = require("../controllers/user.controller")
const userValidator = require("../validators/user.validator");


router.post("/register", requestValidator(userValidator.signUp), userController.signUp);
router.post("/login", requestValidator(userValidator.signIn), userController.signIn);
router.get("/categoryList", userController.listCategory);
router.post("/verifyOtp", requestValidator(userValidator.verifyOtp), userController.verifyOtp);
router.post("/createKnowledgeBase", auth, requestValidator(userValidator.createKnowledgeBase), userController.createKnowledgeBase);
router.post("/getAllDraftList", auth, requestValidator(userValidator.getAllDraftList), userController.getAllDraftList);
router.post("/getAllTopicListByCategory", requestValidator(userValidator.getAllTopicListByCategory), userController.getAllTopicListByCategory);
router.post("/getAllViewListByTopic", requestValidator(userValidator.getAllViewListByTopic), userController.getAllViewListByTopic);
router.get("/getKnowledgeBaseById/:id", userController.getKnowledgeBaseById);
router.post("/updateKnowledgeBase/:id", auth, requestValidator(userValidator.updateKnowledgeBase), userController.updateKnowledgeBase);

module.exports = router;
